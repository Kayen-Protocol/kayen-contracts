// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../interfaces/IKayenMaster.sol";
import "../interfaces/IXKayenToken.sol";
import "./NFTPool.sol";

contract NFTPoolFactory {
  IKayenMaster public immutable master; // Address of the master
  IERC20 public immutable kayenToken;
  IXKayenToken public immutable xKayenToken;

  mapping(address => address) public getPool;
  address[] public pools;

  constructor(
    IKayenMaster master_,
    IERC20 kayenToken_,
    IXKayenToken xKayenToken_
  ) {
    master = master_;
    kayenToken = kayenToken_;
    xKayenToken = xKayenToken_;
  }

  event PoolCreated(address indexed lpToken, address pool);

  function poolsLength() external view returns (uint256) {
    return pools.length;
  }

  function createPool(address lpToken) external returns (address pool){
    require(getPool[lpToken] == address(0), "pool exists");

    bytes memory bytecode_ = _bytecode();
    bytes32 salt = keccak256(abi.encodePacked(lpToken));
    /* solhint-disable no-inline-assembly */
    assembly {
        pool := create2(0, add(bytecode_, 32), mload(bytecode_), salt)
    }
    require(pool != address(0), "failed");

    NFTPool(pool).initialize(master, kayenToken, xKayenToken, IERC20(lpToken));
    getPool[lpToken] = pool;
    pools.push(pool);

    emit PoolCreated(lpToken, pool);
  }

  function _bytecode() internal pure virtual returns (bytes memory) {
    return type(NFTPool).creationCode;
  }
}
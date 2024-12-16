// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;

interface IXKayenTokenUsage {
    function allocate(address userAddress, uint256 amount, bytes calldata data) external;
    function deallocate(address userAddress, uint256 amount, bytes calldata data) external;
}

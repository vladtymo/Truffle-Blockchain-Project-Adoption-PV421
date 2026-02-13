// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Adoption {
    // struct Record {
    //     address adopter;
    //     uint petId;
    // }

    mapping(uint => bool) private adoptions;
    address[] private adopters;
    uint[] private pets;

    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0, "Id can not be less than 0");
        require(adoptions[petId] == false, "Pet has already adopted");

        // adopters[petId] = msg.sender;
        adoptions[petId] = true;

        adopters.push(msg.sender);
        pets.push(petId);

        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public view returns (address[] memory) {
        return adopters;
    }

    // Retrieving the adopted pets
    function getPets() public view returns (uint[] memory) {
        return pets;
    }
}
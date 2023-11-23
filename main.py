#!/bin/python3
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--name", "-n", help="The name of your password", type=str)
parser.add_argument("--username", "-u", help="Username used for your password.", type=str)
parser.add_argument("--secret", "-s", help="The secret to reproduce your password.", type=str)

args = parser.parse_args()

name = args.name or input("Enter the password name: ")
username = args.username or input("Enter your username: ")
secret = args.secret or input("Enter your secret: ")

def safeGet(array, index):
    if len(array) < 2:
        return array[0]
    if index > len(array) - 1:
        index %= len(array) - 1
    return array[index-1]

def generatePassword(name, username, secret):
    left = []
    for index, c in enumerate(name):
        cval = ord(c)
        uval = ord(safeGet(username, index))
        left.append(cval*uval)
        
    right = []
    for index, c in enumerate(username):
        cval = ord(c)
        nval = ord(safeGet(name, index))
        right.append(cval * uval)
        
    res = []
    for index, n in enumerate(right  + left):
        sval = ord(safeGet(secret, index))
        rval = (n // sval) % 93 + 33
        res.append(chr(rval))
        
    return "".join(res)

print(generatePassword(name, username, secret))

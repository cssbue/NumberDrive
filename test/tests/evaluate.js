export default [
  ["1", "1"],
  ["-1", "-1"],
  ["1 + 2 - 3", "0"],
  ["2 * 3 / 3", "2"],
  ["1 / (2 + 2)", "0.25"],
  ["1 / (2 * 2)", "0.25"],
  ["1 / 2^2", "0.25"],
  ["2^3", "8"],
  ["2^(-2)", "0.25"],
  ["2 - 2 * 3", "-4"],
  ["2 - 3^2", "-7"],
  ["2 * 3^2", "18"],
  ["(-1)^3", "-1"],
  ["25 - 5 * 5 ^ 2 / 5", "0"],
  ["[1,2,3] + [4,5,6]", "[5, 7, 9]"],
  ["[1,2,3] - [1,2,3]", "[0, 0, 0]"],
  ["-[1,2,3] - [1,2,3]", "[-2,-4,-6]"],
  ["[1,2,3] * 2", "[2,4,6]"],
  ["2 * [1,2,3]", "[2,4,6]"],
  ["[1,2,3] * (-2)", "[-2,-4,-6]"],
  ["(-2) * [1,2,3]", "[-2,-4,-6]"],
  ["[1,2,3] * [1,2,3]", "14"],
  ["(-[1,2,3]) * [1,2,3]", "-14"],
  ["[[1,2,3],[4,5,6],[7,8,9]]*[[1,0,0],[0,1,0],[0,0,1]]",
  "[[1,2,3],[4,5,6],[7,8,9]]"],
  ["[1,2,3] [[1,0,0],[0,1,0],[0,0,1]]", "[1,2,3]"],
  ["[[1,0,0],[0,1,0],[0,0,1]] [1,2,3]", "[1,2,3]"],
  ["[[1, -1, 2], [0, -3, 1]] [2, 1, 0]", "[1, -3]"],
  ["sin(pi)", "0"],
  ["cos(pi)", "-1"],
  ["tan(pi/4)", "1"],
  ["sqrt(4)", "2"],
  ["1/sqrt(4)", "0.5"],
  ["-sqrt(4)", "-2"],
  ["8^(1/3)", "2"],
  ["exp(2)", "e^2"],
  ["root(8, 3)", "2"],
  ["binco(25, 3)", "2300"],
  ["nsolve((x-2)^2=0)", "[2]"],
  ["nsolve(6*(4*x+10)=3*(10*x-2))", "[11]"],
  ["solve(x=2, x=3-y)", "[x=2,y=1]"],
  ["nsolve(1/x=0)", "[]"],
  ["nsolve((x^2 -2x)*e^(0.5 x)=0,-20,20)", "[0, 2]"],
  ["nsolve(x^3 -21x^2=0, -20, 30)", "[0, 21]"],
  ["nsolve(sin(x)=0, 0, 2*pi)", "[0, 3.14159, 6.28319]"],
  ["nderive(x^2, 2)", "4"],
  ["nderive(x^2, -2)", "-4"],
];

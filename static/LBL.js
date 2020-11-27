/**
 * Step 1 - pre First Layer
 **/
function step1Finished() {
    const indices = [1, 9, 11, 19];
    for (let i = 0; i < indices.length; i++) {
        const cube = getCubeByIndex(indices[i]);
        const color = getFaceColorByVector(cube, YLine); // get up face color
        if (color != buttomColor) {
            return false;
        }
    }
    return true;
}

function step1() {
    if (step1Finished()) {
        console.log('step 1 has finished');
        curLBLstep = 2;
        step2();
        return;
    }

    step1Case1(0);
    step1Case1(1);
    step1Case1(2);
    step1Case1(3);

    step1Case2(0);
    step1Case2(1);
    step1Case2(2);
    step1Case2(3);

    step1Case3(0);
    step1Case3(1);
    step1Case3(2);
    step1Case3(3);

    step1Case4(0);
    step1Case4(1);
    step1Case4(2);
    step1Case4(3);
}

function step1Case1(rotateNum) {
    if (!isRotating) {
        const cube_3 = getCubeByIndex(3, rotateNum);
        const cube_9 = getCubeByIndex(9, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);

        if (getFaceColorByVector(cube_3, zLine) == buttomColor) {
            if (getFaceColorByVector(cube_9, YLine) != buttomColor) {
                l(rotateNum);
            } else {
                u(rotateNum);
            }
        }
    }
}

function step1Case2(rotateNum) {
    if (!isRotating) {
        const cube_5 = getCubeByIndex(5, rotateNum);
        const cube_11 = getCubeByIndex(11, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);

        if (getFaceColorByVector(cube_5, zLine) == buttomColor) {
            if (getFaceColorByVector(cube_11, YLine) != buttomColor) {
                R(rotateNum);
            } else {
                u(rotateNum);
            }
        }
    }
}

function step1Case3(rotateNum) {
    if (!isRotating) {
        const cube_15 = getCubeByIndex(15, rotateNum);
        const cube_9 = getCubeByIndex(9, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);

        if (getFaceColorByVector(cube_15, YLineR) == buttomColor) {
            if (getFaceColorByVector(cube_9, YLine) != buttomColor) {
                l(rotateNum);
            } else {
                u(rotateNum);
            }
        }
    }
}

function step1Case4(rotateNum) {
    if (!isRotating) {
        const cube_1 = getCubeByIndex(1, rotateNum);
        const cube_7 = getCubeByIndex(7, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);

        if (getFaceColorByVector(cube_1, zLine) == buttomColor || getFaceColorByVector(cube_7, zLine) == buttomColor) { //105、106
            if (getFaceColorByVector(cube_1, YLine) != buttomColor) {
                F(rotateNum);
            } else {
                D(rotateNum)
            }
        }
    }
}

/**
 * Step 2 - First Layer Cross (White Cross)
 **/
function step2Finished() {
    const lines = [ZLine, XLine, ZLineR, XLineR];

    let indices = [4, 7, 14, 17, 22, 25, 12, 15];
    let arr = getCubesByIndices(indices);
    for (let i = 0; i < arr.length; i++) {
        let index = parseInt(i / 2);
        let color1 = getFaceColorByVector(arr[i], lines[index]);
        if (color1 == topColor || color1 == buttomColor) {
            return false;
        }
        if (i % 2 == 0) {
            let color2 = getFaceColorByVector(arr[i + 1], lines[index]);
            if (color1 != color2) {
                return false;
            }
        }
    }
    // Check bottom cross.
    for (let i = 1; i < arr.length; i = i + 2) {
        let color = getFaceColorByVector(arr[i], YLineR);
        if (color != buttomColor) {
            return false;
        }
    }
    indices = [6, 8, 26, 24];
    arr = getCubesByIndices(indices);
    for (let i = 0; i < arr.length; i++) {
        let color = getFaceColorByVector(arr[i], YLineR);
        if (color == buttomColor) {
            return false;
        }
    }

    return true;
}

function step2() {
    if (step2Finished()) {
        console.log('step 2 has finished');
        curLBLstep = 3;
        step3();
        return;
    }

    step2Case1(0);
    step2Case1(1);
    step2Case1(2);
    step2Case1(3);

    step2Case2(0);
    step2Case2(1);
    step2Case2(2);
    step2Case2(3);

    step2Case3(0);
    step2Case3(1);
    step2Case3(2);
    step2Case3(3);
}

function step2Case1(rotateNum) {
    if (!isRotating) {
        const cube_1 = getCubeByIndex(1, rotateNum);
        const cube_4 = getCubeByIndex(4, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);

        if (getFaceColorByVector(cube_1, YLine) == buttomColor) {
            if (getFaceColorByVector(cube_1, zLine) == getFaceColorByVector(cube_4, zLine)) {
                F(rotateNum, function() {
                    F(rotateNum);
                });
            } else {
                u(rotateNum, function() {
                    rotateNum = (rotateNum + 1) % 4;
                    step2Case1(rotateNum);
                });
            }
        }
    }
}

function step2Case2(rotateNum) {
    if (!isRotating) {
        const cube_7 = getCubeByIndex(7, rotateNum);
        const cube_8 = getCubeByIndex(8, rotateNum);
        const cube_2 = getCubeByIndex(2, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        if (getFaceColorByVector(cube_7, YLineR) == buttomColor &&
            getFaceColorByVector(cube_8, YLineR) == buttomColor) {
            if (getFaceColorByVector(cube_2, xLine) != buttomColor) {
                R(rotateNum, function() {
                    u(rotateNum, function() {
                        r(rotateNum);
                    });
                })
            } else {
                f(rotateNum, function() {
                    u(rotateNum, function() {
                        F(rotateNum);
                    });
                })
            }
        }
    }
}

function step2Case3(rotateNum) {
    if (!isRotating) {
        const cube_7 = getCubeByIndex(7, rotateNum);
        const cube_6 = getCubeByIndex(6, rotateNum);
        const cube_0 = getCubeByIndex(0, rotateNum);
        const xLineR = rotateAxisAroundY(XLineR, rotateNum);
        if (getFaceColorByVector(cube_7, YLineR) == buttomColor &&
            getFaceColorByVector(cube_6, YLineR) == buttomColor) {
            if (getFaceColorByVector(cube_0, xLineR) != buttomColor) {
                l(rotateNum, function() {
                    u(rotateNum, function() {
                        L(rotateNum)
                    });
                })
            } else {
                f(rotateNum, function() {
                    u(rotateNum, function() {
                        F(rotateNum);
                    });
                })
            }
        }
    }
}

/**
 * Step 3 - First Layer Corners (White Corners)
 **/
function step3Finished() {
    const indices1 = [4, 6, 7, 8];
    const indices2 = [14, 8, 17, 26];
    const indices3 = [22, 24, 25, 26];
    const indices4 = [12, 6, 15, 24];
    if (!checkStep3Item(indices1, ZLine)) return false;
    if (!checkStep3Item(indices2, XLine)) return false;
    if (!checkStep3Item(indices3, ZLineR)) return false;
    if (!checkStep3Item(indices4, XLineR)) return false;
    return true;
}

function step3() {
    if (step3Finished()) {
        console.log('step 3 has finished');
        curLBLstep = 4;
        startFaceNo = 0;
        endFaceNo = 3;
        step4();
        return;
    }

    step3Case1(0);
    step3Case1(1);
    step3Case1(2);
    step3Case1(3);

    step3Case2(0);
    step3Case2(1);
    step3Case2(2);
    step3Case2(3);

    step3Case3(0);
    step3Case3(1);
    step3Case3(2);
    step3Case3(3);

    step3Case4(0);
    step3Case4(1);
    step3Case4(2);
    step3Case4(3);

    step3Case5(0);
    step3Case5(1);
    step3Case5(2);
    step3Case5(3);
}

function step3Case1(rotateNum, startNum) {
    if (!isRotating) {
        const cube_2 = getCubeByIndex(2, rotateNum);
        const cube_8 = getCubeByIndex(8, rotateNum);
        const cube_4 = getCubeByIndex(4, rotateNum);
        const cube_7 = getCubeByIndex(7, rotateNum);
        const cube_14 = getCubeByIndex(14, rotateNum);
        const cube_17 = getCubeByIndex(17, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const zLineR = rotateAxisAroundY(ZLineR, rotateNum);
        const xLineR = rotateAxisAroundY(XLineR, rotateNum);
        const cube_2_Z_color = getFaceColorByVector(cube_2, zLine);
        const cube_2_Y_color = getFaceColorByVector(cube_2, YLine);

        if (getFaceColorByVector(cube_2, xLine) == buttomColor && !cube_2.skipNext) {
            if (getFaceColorByVector(cube_8, YLineR) != buttomColor &&
                getFaceColorByVector(cube_4, zLine) == cube_2_Z_color &&
                getFaceColorByVector(cube_7, zLine) == cube_2_Z_color &&
                getFaceColorByVector(cube_14, xLine) == cube_2_Y_color &&
                getFaceColorByVector(cube_17, xLine) == cube_2_Y_color) {
                R(rotateNum, function() {
                    U(rotateNum, function() {
                        r(rotateNum)
                    })
                })
            } else {
                u(rotateNum, function() {
                    rotateNum++;
                    if (rotateNum >= 4) rotateNum = 0;
                    if (startNum != rotateNum) { // Avoid loop by repeated check.
                        if (startNum == null || startNum == undefined) {
                            startNum = rotateNum - 1;
                            step3Case1(rotateNum, startNum);
                        } else {
                            step3Case1(rotateNum, startNum);
                        }
                    } else {
                        let cube_2 = getCubeByIndex(2, rotateNum);
                        cube_2.skipNext = true;
                        step3();
                    }
                })
            }
        }
    }
}

function step3Case2(rotateNum, startNum) {
    if (!isRotating) {
        const cube_2 = getCubeByIndex(2, rotateNum);
        const cube_8 = getCubeByIndex(8, rotateNum);
        const cube_4 = getCubeByIndex(4, rotateNum);
        const cube_7 = getCubeByIndex(7, rotateNum);
        const cube_14 = getCubeByIndex(14, rotateNum);
        const cube_17 = getCubeByIndex(17, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const zLineR = rotateAxisAroundY(ZLineR, rotateNum);
        const xLineR = rotateAxisAroundY(XLineR, rotateNum);
        const cube_2_Y_color = getFaceColorByVector(cube_2, YLine);
        const cube_2_X_color = getFaceColorByVector(cube_2, xLine);

        if (getFaceColorByVector(cube_2, zLine) == buttomColor && !cube_2.skipNext) {
            if (getFaceColorByVector(cube_8, YLineR) != buttomColor &&
                getFaceColorByVector(cube_4, zLine) == cube_2_Y_color &&
                getFaceColorByVector(cube_7, zLine) == cube_2_Y_color &&
                getFaceColorByVector(cube_14, xLine) == cube_2_X_color &&
                getFaceColorByVector(cube_17, xLine) == cube_2_X_color) {
                f(rotateNum, function() {
                    u(rotateNum, function() {
                        F(rotateNum)
                    })
                })
            } else {
                u(rotateNum, function() {
                    rotateNum++;
                    if (rotateNum >= 4) {
                        rotateNum = 0;
                    }
                    if (startNum != rotateNum) {
                        if (startNum == null || startNum == undefined) {
                            startNum = rotateNum - 1;
                            step3Case2(rotateNum, startNum);
                        } else {
                            step3Case2(rotateNum, startNum);
                        }
                    } else {
                        let cube_2 = getCubeByIndex(2, rotateNum);
                        cube_2.skipNext = true;
                        step3();
                    }
                })
            }
        }
    }
}

function step3Case3(rotateNum, startNum) {
    if (!isRotating) {
        const cube_2 = getCubeByIndex(2, rotateNum);
        const cube_8 = getCubeByIndex(8, rotateNum);
        const cube_4 = getCubeByIndex(4, rotateNum);
        const cube_7 = getCubeByIndex(7, rotateNum);
        const cube_14 = getCubeByIndex(14, rotateNum);
        const cube_17 = getCubeByIndex(17, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const zLineR = rotateAxisAroundY(ZLineR, rotateNum);
        const xLineR = rotateAxisAroundY(XLineR, rotateNum);
        const cube_2_Z_color = getFaceColorByVector(cube_2, zLine);
        const cube_2_X_color = getFaceColorByVector(cube_2, xLine);

        if (getFaceColorByVector(cube_2, YLine) == buttomColor && !cube_2.skipNext) {
            if (getFaceColorByVector(cube_8, YLineR) != buttomColor &&
                getFaceColorByVector(cube_14, xLine) == cube_2_Z_color &&
                getFaceColorByVector(cube_17, xLine) == cube_2_Z_color &&
                getFaceColorByVector(cube_4, zLine) == cube_2_X_color &&
                getFaceColorByVector(cube_7, zLine) == cube_2_X_color) {
                // To step3Case2
                f(rotateNum, function() {
                    u(rotateNum, function() {
                        u(rotateNum, function() {
                            F(rotateNum, function() {
                                U(rotateNum)
                            })
                        })
                    })
                })
            } else {
                u(rotateNum, function() {
                    rotateNum++;
                    if (rotateNum >= 4) {
                        rotateNum = 0;
                    }
                    if (startNum != rotateNum) {
                        if (startNum == null || startNum == undefined) {
                            startNum = rotateNum - 1;
                            step3Case3(rotateNum, startNum);
                        } else {
                            step3Case3(rotateNum, startNum);
                        }
                    } else {
                        let cube_2 = getCubeByIndex(2, rotateNum);
                        cube_2.skipNext = true;
                        step3();
                    }
                })
            }
        }
    }
}

function step3Case4(rotateNum) {
    if (!isRotating) {
        const cube_8 = getCubeByIndex(8, rotateNum);
        const cube_4 = getCubeByIndex(4, rotateNum);
        const cube_7 = getCubeByIndex(7, rotateNum);
        const cube_14 = getCubeByIndex(14, rotateNum);
        const cube_17 = getCubeByIndex(17, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const cube_8_Z_color = getFaceColorByVector(cube_8, zLine);
        const cube_8_YR_color = getFaceColorByVector(cube_8, YLineR);

        if (getFaceColorByVector(cube_8, xLine) == buttomColor) {
            if (getFaceColorByVector(cube_17, xLine) == cube_8_Z_color &&
                getFaceColorByVector(cube_14, xLine) == cube_8_Z_color &&
                getFaceColorByVector(cube_4, zLine) == cube_8_YR_color &&
                getFaceColorByVector(cube_7, zLine) == cube_8_YR_color) {
                // To step3Case1
                f(rotateNum, function() {
                    U(rotateNum, function() {
                        F(rotateNum)
                    })
                })
            } else {
                // To step3Case3
                f(rotateNum, function() {
                    u(rotateNum, function() {
                        F(rotateNum)
                    })
                })
            }
        }
    }
}

function step3Case5(rotateNum) {
    if (!isRotating) {
        const cube_8 = getCubeByIndex(8, rotateNum);
        const cube_4 = getCubeByIndex(4, rotateNum);
        const cube_7 = getCubeByIndex(7, rotateNum);
        const cube_14 = getCubeByIndex(14, rotateNum);
        const cube_17 = getCubeByIndex(17, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const cube_8_X_color = getFaceColorByVector(cube_8, xLine);
        const cube_8_YR_color = getFaceColorByVector(cube_8, YLineR);

        if (getFaceColorByVector(cube_8, zLine) == buttomColor) {
            if (getFaceColorByVector(cube_7, zLine) == cube_8_X_color &&
                getFaceColorByVector(cube_4, zLine) == cube_8_X_color &&
                getFaceColorByVector(cube_14, xLine) == cube_8_YR_color &&
                getFaceColorByVector(cube_17, xLine) == cube_8_YR_color) {
                // To step3Case2
                f(rotateNum, function() {
                    u(rotateNum, function() {
                        F(rotateNum, function() {
                            U(rotateNum)
                        })
                    })
                })
            } else {
                // To step3Case3
                R(rotateNum, function() {
                    u(rotateNum, function() {
                        r(rotateNum)
                    })
                })
            }
        }
    }
}

function checkStep3Item(indices, line) {
    if (indices.length > 0) {
        let arr = getCubesByIndices(indices);
        for (let i = 1; i < arr.length; i++) {
            if (getFaceColorByVector(arr[i], line) != getFaceColorByVector(arr[0], line)) {
                return false;
            }
            if (getFaceColorByVector(arr[i], YLineR) != buttomColor) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Step 4 - Second Layer
 **/
function step4() {
    if (step4Finished()) {
        console.log('step 4 has finished');
        curLBLstep = 5;
        step5();
        return;
    }
    step4Face(currentFaceNo);
}

function step4Finished() {
    if (!step3Finished()) return false;

    const cube_3 = getCubeByIndex(3);
    const cube_4 = getCubeByIndex(4);
    const cube_5 = getCubeByIndex(5);
    const cube_3_Z_color = getFaceColorByVector(cube_3, ZLine);
    if (getFaceColorByVector(cube_4, ZLine) != cube_3_Z_color ||
        getFaceColorByVector(cube_5, ZLine) != cube_3_Z_color) {
        return false;
    }

    const cube_14 = getCubeByIndex(14);
    const cube_23 = getCubeByIndex(23);
    const cube_5_X_color = getFaceColorByVector(cube_5, XLine);
    if (getFaceColorByVector(cube_14, XLine) != cube_5_X_color ||
        getFaceColorByVector(cube_23, XLine) != cube_5_X_color) {
        return false;
    }

    const cube_21 = getCubeByIndex(21);
    const cube_22 = getCubeByIndex(22);
    const cube_23_ZR_color = getFaceColorByVector(cube_23, ZLineR);
    if (getFaceColorByVector(cube_21, ZLineR) != cube_23_ZR_color ||
        getFaceColorByVector(cube_22, ZLineR) != cube_23_ZR_color) {
        return false;
    }

    const cube_12 = getCubeByIndex(12);
    const cube_3_XR_color = getFaceColorByVector(cube_3, XLineR);
    if (getFaceColorByVector(cube_12, XLineR) != cube_3_XR_color ||
        getFaceColorByVector(cube_21, XLineR) != cube_3_XR_color) {
        return false;
    }

    return true;
}

function rotate401(rotateNum, callback) {
    rotateNum = (rotateNum + 4) % 4;
    const arr = [r, u, r, u, r, U, R, U, R];
    runMethodAtIndex(arr, 0, rotateNum, callback);
}

function rotate401_Opposite(rotateNum, callback) {
    rotateNum = (rotateNum + 4) % 4;
    const arr = [r, u, r, u, R, U, R, U, R];
    runMethodAtIndex(arr, 0, rotateNum, callback);
}

function rotate402(rotateNum, callback) {
    rotateNum = (rotateNum + 4) % 4;
    const arr = [F, U, F, U, F, u, f, u, f];
    runMethodAtIndex(arr, 0, rotateNum, callback);
}

function rotate402_Opposite(rotateNum, callback) {
    rotateNum = (rotateNum + 4) % 4;
    const arr = [F, U, F, U, f, u, f, u, f];
    runMethodAtIndex(arr, 0, rotateNum, callback);
}

function step4Face(rotateNum) {
    if (!isRotating) {
        rotateNum = (rotateNum + 4) % 4;
        currentFaceNo = rotateNum;
        const cube_3 = getCubeByIndex(3, rotateNum);
        const cube_4 = getCubeByIndex(4, rotateNum);
        const cube_5 = getCubeByIndex(5, rotateNum);
        const cube_6 = getCubeByIndex(6, rotateNum);
        const cube_9 = getCubeByIndex(9, rotateNum);
        const cube_19 = getCubeByIndex(19, rotateNum);
        const cube_11 = getCubeByIndex(11, rotateNum);
        const cube_14 = getCubeByIndex(14, rotateNum);
        const cube_1 = getCubeByIndex(1, rotateNum);
        const cube_21 = getCubeByIndex(21, rotateNum);
        const cube_23 = getCubeByIndex(23, rotateNum);

        const xLine = rotateAxisAroundY(XLine, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const xLineR = rotateAxisAroundY(XLineR, rotateNum);
        const zLineR = rotateAxisAroundY(ZLineR, rotateNum);

        const cube_4_Z_color = getFaceColorByVector(cube_4, zLine);
        const cube_6_XR_color = getFaceColorByVector(cube_6, xLineR);
        const cube_14_X_color = getFaceColorByVector(cube_14, xLine);

        if (getFaceColorByVector(cube_3, zLine) != cube_4_Z_color) {
            if (getFaceColorByVector(cube_9, YLine) == cube_4_Z_color &&
                (getFaceColorByVector(cube_9, xLineR) == cube_6_XR_color || rotateNum == startFaceNo)) {
                rotate402(rotateNum - 1);
                return;
            } else if (getFaceColorByVector(cube_9, xLineR) == cube_4_Z_color &&
                (getFaceColorByVector(cube_9, YLine) == cube_6_XR_color || rotateNum == startFaceNo)) {
                u(0, function() {
                    rotate401(rotateNum - 1);
                });
                return;
            } else if ((getFaceColorByVector(cube_19, YLine) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_19, zLineR) == cube_6_XR_color || rotateNum == startFaceNo)) ||
                (getFaceColorByVector(cube_19, zLineR) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_19, YLine) == cube_6_XR_color || rotateNum == startFaceNo)) ||
                (getFaceColorByVector(cube_11, YLine) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_11, xLine) == cube_6_XR_color || rotateNum == startFaceNo)) ||
                (getFaceColorByVector(cube_11, xLine) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_11, YLine) == cube_6_XR_color || rotateNum == startFaceNo)) ||
                (getFaceColorByVector(cube_1, YLine) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_1, zLine) == cube_6_XR_color || rotateNum == startFaceNo)) ||
                (getFaceColorByVector(cube_1, zLine) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_1, YLine) == cube_6_XR_color || rotateNum == startFaceNo))) {
                U(0);
                return;
            } else if (getFaceColorByVector(cube_5, zLine) == cube_4_Z_color &&
                (getFaceColorByVector(cube_5, xLine) == cube_6_XR_color || rotateNum == startFaceNo)) {
                rotate401_Opposite(rotateNum);
                return;
            } else if (getFaceColorByVector(cube_3, xLineR) == cube_4_Z_color &&
                (getFaceColorByVector(cube_3, zLine) == cube_6_XR_color || rotateNum == startFaceNo)) {
                let tempNum = rotateNum - 1;
                rotate402(tempNum, function() {
                    U(tempNum, function() {
                        rotate401(tempNum);
                    });
                });
                return;
            } else if (getFaceColorByVector(cube_23, xLine) == cube_4_Z_color &&
                (getFaceColorByVector(cube_23, zLineR) == cube_6_XR_color || rotateNum == startFaceNo)) {
                rotate402_Opposite(rotateNum - 3);
                return;
            } else if (getFaceColorByVector(cube_23, zLineR) == cube_4_Z_color &&
                (getFaceColorByVector(cube_23, xLine) == cube_6_XR_color || rotateNum == startFaceNo)) {
                rotate402_Opposite(rotateNum - 3);
                return;
            } else if (getFaceColorByVector(cube_5, xLine) == cube_4_Z_color &&
                (getFaceColorByVector(cube_5, zLine) == cube_6_XR_color || rotateNum == startFaceNo)) {
                rotate402_Opposite(rotateNum);
                return;
            } else if ((getFaceColorByVector(cube_21, xLineR) == cube_4_Z_color || getFaceColorByVector(cube_21, zLineR) == cube_4_Z_color) && rotateNum <= 0) {
                rotate402_Opposite(rotateNum - 2);
                return;
            }
        }
        if (getFaceColorByVector(cube_5, zLine) != cube_4_Z_color) {
            if (getFaceColorByVector(cube_11, YLine) == cube_4_Z_color &&
                (getFaceColorByVector(cube_11, xLine) == cube_14_X_color || rotateNum != endFaceNo)) {
                rotate401(rotateNum);
                return;
            } else if (getFaceColorByVector(cube_11, xLine) == cube_4_Z_color &&
                (getFaceColorByVector(cube_11, YLine) == cube_14_X_color || rotateNum != endFaceNo)) {
                U(0, function() {
                    rotate402(rotateNum);
                });
                return;
            } else if ((getFaceColorByVector(cube_1, YLine) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_1, zLine) == cube_14_X_color || rotateNum != endFaceNo)) ||
                (getFaceColorByVector(cube_1, zLine) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_1, YLine) == cube_14_X_color || rotateNum != endFaceNo)) ||
                (getFaceColorByVector(cube_9, YLine) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_9, xLineR) == cube_14_X_color || rotateNum != endFaceNo)) ||
                (getFaceColorByVector(cube_9, xLineR) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_9, YLine) == cube_14_X_color || rotateNum != endFaceNo)) ||
                (getFaceColorByVector(cube_19, YLine) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_19, zLineR) == cube_14_X_color || rotateNum != endFaceNo)) ||
                (getFaceColorByVector(cube_19, zLineR) == cube_4_Z_color &&
                    (getFaceColorByVector(cube_19, YLine) == cube_14_X_color || rotateNum != endFaceNo))) {
                u(0);
                return;
            } else if (getFaceColorByVector(cube_5, xLine) == cube_4_Z_color &&
                (getFaceColorByVector(cube_5, zLine) == cube_14_X_color || rotateNum != endFaceNo)) {
                rotate402_Opposite(rotateNum);
                return;
            } else if ((getFaceColorByVector(cube_21, xLineR) == cube_4_Z_color || getFaceColorByVector(cube_21, zLineR) == cube_4_Z_color) && rotateNum <= 0) {
                rotate402_Opposite(rotateNum - 2);
                return;
            } else if (getFaceColorByVector(cube_23, zLineR) == cube_4_Z_color && rotateNum == startFaceNo) {
                rotate402_Opposite(rotateNum - 3);
                return;
            } else if (getFaceColorByVector(cube_23, xLine) == cube_4_Z_color &&
                (getFaceColorByVector(cube_23, zLineR) == cube_14_X_color || rotateNum != endFaceNo)) {
                rotate402_Opposite(rotateNum - 3);
                return;
            }
        }

        if (getFaceColorByVector(cube_3, zLine) != cube_4_Z_color || getFaceColorByVector(cube_5, zLine) != cube_4_Z_color) {
            // Extreme case for one face. Restart with this face.
            startFaceNo = currentFaceNo;
            if (startFaceNo > 0) {
                endFaceNo = startFaceNo - 1;
            } else {
                endFaceNo = 3;
            }
        } else {
            currentFaceNo++;
            if (currentFaceNo > 3) {
                currentFaceNo = 0;
            }
        }
        step4();
    }
}

/**
 * Step 5 - Up Face Cross (Yellow Cross)
 **/
function step5Finished() {
    if (!step4Finished()) return false;
    const cube_10 = getCubeByIndex(10);
    const cube_1 = getCubeByIndex(1);
    const cube_11 = getCubeByIndex(11);
    const cube_9 = getCubeByIndex(9);
    const cube_19 = getCubeByIndex(19);
    if (getFaceColorByVector(cube_10, YLine) != topColor) return false;
    if (getFaceColorByVector(cube_1, YLine) != topColor) return false;
    if (getFaceColorByVector(cube_11, YLine) != topColor) return false;
    if (getFaceColorByVector(cube_9, YLine) != topColor) return false;
    if (getFaceColorByVector(cube_19, YLine) != topColor) return false;
    return true;
}

function step5() {
    if (step5Finished()) {
        console.log('step 5 has finished');
        curLBLstep = 6;
        step6();
        return;
    }

    step5Case1(0);
    step5Case1(1);
    step5Case1(2);
    step5Case1(3);

    step5Case2(0);
    step5Case2(1);
    step5Case2(2);
    step5Case2(3);

    step5Case3(0);
    step5Case3(1);
    step5Case3(2);
    step5Case3(3);
}

function rotate501(rotateNum, callback) {
    const arr = [r, u, f, U, F, R];
    runMethodAtIndex(arr, 0, rotateNum, callback);
}

function rotate502(rotateNum, callback) {
    const arr = [r, f, u, F, U, R];
    runMethodAtIndex(arr, 0, rotateNum, callback);
}

function step5Case1(rotateNum) {
    if (!isRotating) {
        const cube_1 = getCubeByIndex(1, rotateNum);
        const cube_11 = getCubeByIndex(11, rotateNum);
        const cube_9 = getCubeByIndex(9, rotateNum);
        const cube_19 = getCubeByIndex(19, rotateNum);
        const cube_10 = getCubeByIndex(10, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        if (getFaceColorByVector(cube_10, YLine) == topColor &&
            getFaceColorByVector(cube_9, YLine) == topColor &&
            getFaceColorByVector(cube_19, YLine) == topColor &&
            getFaceColorByVector(cube_1, zLine) == topColor &&
            getFaceColorByVector(cube_11, xLine) == topColor) {
            rotate501(rotateNum);
        }
    }
}

function step5Case2(rotateNum) {
    if (!isRotating) {
        const cube_1 = getCubeByIndex(1, rotateNum);
        const cube_11 = getCubeByIndex(11, rotateNum);
        const cube_19 = getCubeByIndex(19, rotateNum);
        const cube_10 = getCubeByIndex(10, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        if (getFaceColorByVector(cube_10, YLine) == topColor &&
            getFaceColorByVector(cube_1, YLine) == topColor &&
            getFaceColorByVector(cube_19, YLine) == topColor &&
            getFaceColorByVector(cube_11, xLine) == topColor) {
            rotate501(rotateNum);
        }
    }
}

function step5Case3(rotateNum) {
    if (!isRotating) {
        const cube_1 = getCubeByIndex(1, rotateNum);
        const cube_11 = getCubeByIndex(11, rotateNum);
        const cube_10 = getCubeByIndex(10, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        if (getFaceColorByVector(cube_10, YLine) == topColor &&
            getFaceColorByVector(cube_1, zLine) == topColor &&
            getFaceColorByVector(cube_11, xLine) == topColor) {
            rotate501(rotateNum, function() {
                U(rotateNum, function() {
                    rotate502(rotateNum);
                })
            });
        }
    }
}
/**
 * Step 6 - Swap Yellow Edges
 **/
function step6Finished() {
    if (!step5Finished()) return false;

    const cube_0 = getCubeByIndex(0);
    const cube_2 = getCubeByIndex(2);
    const cube_18 = getCubeByIndex(18);
    const cube_20 = getCubeByIndex(20);
    if (getFaceColorByVector(cube_0, YLine) != topColor) return false;
    if (getFaceColorByVector(cube_2, YLine) != topColor) return false;
    if (getFaceColorByVector(cube_18, YLine) != topColor) return false;
    if (getFaceColorByVector(cube_20, YLine) != topColor) return false;
    return true;
}

function step6() {
    if (step6Finished()) {
        console.log('step 6 has finished');
        curLBLstep = 7;
        step7();
        return;
    }

    step6Case1(0);
    step6Case1(1);
    step6Case1(2);
    step6Case1(3);
}

function rotate601(rotateNum) {
    const arr = [r, U, L, u, R, U, l, u];
    runMethodAtIndex(arr, 0, rotateNum);
}

function rotate602(rotateNum) {
    const arr = [U, L, u, r, U, l, u, R];
    runMethodAtIndex(arr, 0, rotateNum);
}

function rotate603(rotateNum) {
    const arr = [R, U, r, U, R, U, U, r];
    runMethodAtIndex(arr, 0, rotateNum);
}

function step6Case1(rotateNum) {
    if (!isRotating) {
        const cube_0 = getCubeByIndex(0, rotateNum);
        const cube_2 = getCubeByIndex(2, rotateNum);
        const cube_20 = getCubeByIndex(20, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        if (getFaceColorByVector(cube_0, zLine) == topColor &&
            getFaceColorByVector(cube_2, xLine) == topColor) {
            rotate601(rotateNum);
        } else if (getFaceColorByVector(cube_2, zLine) == topColor &&
            getFaceColorByVector(cube_20, xLine) == topColor) {
            rotate602(rotateNum);
        } else if (getFaceColorByVector(cube_0, zLine) == topColor) {
            rotate603(rotateNum);
        }
    }
}

/**
 * Step 7 - Position Yellow Corners
 **/
function step7Finished() {
    if (!step6Finished()) return false;

    const cube_1 = getCubeByIndex(1);
    const cube_4 = getCubeByIndex(4);
    const cube_11 = getCubeByIndex(11);
    const cube_14 = getCubeByIndex(14);
    const cube_19 = getCubeByIndex(19);
    const cube_22 = getCubeByIndex(22);
    const cube_9 = getCubeByIndex(9);
    const cube_12 = getCubeByIndex(12);

    if (getFaceColorByVector(cube_1, ZLine) != getFaceColorByVector(cube_4, ZLine)) return false;
    if (getFaceColorByVector(cube_11, XLine) != getFaceColorByVector(cube_14, XLine)) return false;
    if (getFaceColorByVector(cube_19, ZLineR) != getFaceColorByVector(cube_22, ZLineR)) return false;
    if (getFaceColorByVector(cube_9, XLineR) != getFaceColorByVector(cube_12, XLineR)) return false;

    return true;
}

function step7() {
    if (step7Finished()) {
        console.log('step 7 has finished');
        curLBLstep = 8;
        step8();
        return;
    }

    step7Case1(0);
    step7Case1(1);
    step7Case1(2);
    step7Case1(3);

    step7Case2(0);
    step7Case2(1);
    step7Case2(2);
    step7Case2(3);

    step7Case3();
}

function step7Case1(rotateNum) {
    if (!isRotating) {
        const cube_1 = getCubeByIndex(1, rotateNum);
        const cube_4 = getCubeByIndex(4, rotateNum);
        const cube_11 = getCubeByIndex(11, rotateNum);
        const cube_14 = getCubeByIndex(14, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        const cube_4_Z_color = getFaceColorByVector(cube_4, zLine);
        if (getFaceColorByVector(cube_1, zLine) != cube_4_Z_color &&
            cube_4_Z_color == getFaceColorByVector(cube_11, xLine) &&
            cube_4_Z_color != getFaceColorByVector(cube_14, xLine)) {
            F(rotateNum, function() {
                F(rotateNum, function() {
                    U(rotateNum, function() {
                        r(rotateNum, function() {
                            L(rotateNum, function() {
                                F(rotateNum, function() {
                                    F(rotateNum, function() {
                                        R(rotateNum, function() {
                                            l(rotateNum, function() {
                                                U(rotateNum, function() {
                                                    F(rotateNum, function() {
                                                        F(rotateNum)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    }
}

function step7Case2(rotateNum) {
    if (!isRotating) {
        const cube_1 = getCubeByIndex(1, rotateNum);
        const cube_4 = getCubeByIndex(4, rotateNum);
        const cube_11 = getCubeByIndex(11, rotateNum);
        const cube_14 = getCubeByIndex(14, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        const cube_1_Z_color = getFaceColorByVector(cube_1, zLine);
        if (cube_1_Z_color != getFaceColorByVector(cube_4, zLine) &&
            cube_1_Z_color == getFaceColorByVector(cube_14, xLine) &&
            cube_1_Z_color != getFaceColorByVector(cube_11, xLine)) {
            F(rotateNum, function() {
                F(rotateNum, function() {
                    u(rotateNum, function() {
                        r(rotateNum, function() {
                            L(rotateNum, function() {
                                F(rotateNum, function() {
                                    F(rotateNum, function() {
                                        R(rotateNum, function() {
                                            l(rotateNum, function() {
                                                u(rotateNum, function() {
                                                    F(rotateNum, function() {
                                                        F(rotateNum)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    }
}

function step7Case3() {
    if (!isRotating && !step7Finished()) {
        u(0);
    }
}

/**
 * Step 8 - Orient Yellow Corners
 **/
function checkStep8Item(indices, line) {
    if (indices.length > 0) {
        let arr = getCubesByIndices(indices);
        let color = getFaceColorByVector(arr[0], line)
        for (let i = 1; i < arr.length; i++) {
            if (getFaceColorByVector(arr[i], line) != color) {
                return false;
            }
        }
    }
    return true;
}

function step8Finished() {
    const indices1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const indices2 = [2, 5, 8, 11, 14, 17, 20, 23, 26];
    const indices3 = [18, 19, 20, 21, 22, 23, 24, 25, 26];
    const indices4 = [0, 3, 6, 9, 12, 15, 18, 21, 24];
    if (!checkStep8Item(indices1, ZLine)) return false;
    if (!checkStep8Item(indices2, XLine)) return false;
    if (!checkStep8Item(indices3, ZLineR)) return false;
    if (!checkStep8Item(indices4, XLineR)) return false;
    return true;
}

function step8() {
    if (step8Finished()) {
        isAutoSolver = false;
        console.log('LBL Solver Finished');
        return;
    }

    step8Case1(0);
    step8Case1(1);
    step8Case1(2);
    step8Case1(3);

    step8Case2(0);
    step8Case2(1);
    step8Case2(2);
    step8Case2(3);

    step8Case3();
}

function rotate8_1(rotateNum) {
    const arr = [R, R, B, B, R, F, r, B, B, R, f, R];
    runMethodAtIndex(arr, 0, rotateNum);
}

function rotate8_2(rotateNum) {
    const arr = [L, L, B, B, l, f, L, B, B, l, F, l];
    runMethodAtIndex(arr, 0, rotateNum);
}

function step8Case1(rotateNum) {
    if (!isRotating) {
        const cube_2 = getCubeByIndex(2, rotateNum);
        const cube_20 = getCubeByIndex(20, rotateNum);
        const cube_11 = getCubeByIndex(11, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        if (getFaceColorByVector(cube_2, xLine) == getFaceColorByVector(cube_20, xLine) &&
            getFaceColorByVector(cube_2, xLine) != getFaceColorByVector(cube_11, xLine)) {
            rotate8_1(rotateNum);
        }
    }
}

function step8Case2(rotateNum) {
    if (!isRotating) {
        const cube_0 = getCubeByIndex(0, rotateNum);
        const cube_1 = getCubeByIndex(1, rotateNum);
        const cube_2 = getCubeByIndex(2, rotateNum);
        const cube_11 = getCubeByIndex(11, rotateNum);
        const cube_20 = getCubeByIndex(20, rotateNum);
        const xLine = rotateAxisAroundY(XLine, rotateNum);
        const zLine = rotateAxisAroundY(ZLine, rotateNum);
        if (getFaceColorByVector(cube_0, zLine) == getFaceColorByVector(cube_20, xLine) &&
            getFaceColorByVector(cube_1, zLine) == getFaceColorByVector(cube_2, zLine) &&
            getFaceColorByVector(cube_11, xLine) == getFaceColorByVector(cube_20, xLine) &&
            getFaceColorByVector(cube_0, zLine) != getFaceColorByVector(cube_1, zLine) &&
            getFaceColorByVector(cube_20, xLine) != getFaceColorByVector(cube_20, xLine)) {
            rotate8_2(rotateNum);
        }
    }
}

function step8Case3() {
    if (!isRotating) {
        const cube_0 = getCubeByIndex(0);
        const cube_2 = getCubeByIndex(2);
        const cube_20 = getCubeByIndex(20);
        const cube_18 = getCubeByIndex(18);
        if (getFaceColorByVector(cube_0, ZLine) != getFaceColorByVector(cube_2, ZLine) &&
            getFaceColorByVector(cube_2, XLine) != getFaceColorByVector(cube_20, XLine) &&
            getFaceColorByVector(cube_20, ZLineR) != getFaceColorByVector(cube_18, ZLineR) &&
            getFaceColorByVector(cube_18, XLineR) != getFaceColorByVector(cube_0, XLineR)) {
            rotate8_1(0);
        }
    }
}
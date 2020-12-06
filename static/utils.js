/***********************************************  HELPER functions ***********************************************/
const funcArr = [R, U, F, B, L, D, r, u, f, b, l, d];

// Function to shuffle the cube.
function shuffle(minStep = 0, maxStep = 20) {
    if (!isRotating && !isAutoSolver) {
        isShuffle = true;
        const times = minStep + parseInt(maxStep * Math.random()) + 1;
        console.log("Random rotate " + times + " times");
        let stepArr = [];
        for (let i = 0; i < times; i++) {
            let num = parseInt(Math.random() * funcArr.length);
            stepArr.push(funcArr[num]);
        }
        runMethodAtIndex(stepArr, 0, 0, function() {
            isShuffle = false;
            timerEnabled = true;
            lastTime = new Date();
        });
    }
}

/*
 * Basic methods: U、F、L、D、R、u、f、l、d
 */
function U(rotateNum, callback) {
    let cube_2 = getCubeByIndex(2, rotateNum);
    let zLine = rotateAxisAroundY(ZLine, rotateNum);
    let xLineR = rotateAxisAroundY(XLineR, rotateNum);
    normalize = zLine;
    rotateMove(cube_2, xLineR, callback);
}

function u(rotateNum, callback) {
    let cube_2 = getCubeByIndex(2, rotateNum);
    let xLine = rotateAxisAroundY(XLine, rotateNum);
    let zLineR = rotateAxisAroundY(ZLineR, rotateNum);
    normalize = xLine;
    rotateMove(cube_2, zLineR, callback);
}

function F(rotateNum, callback) {
    let cube_2 = getCubeByIndex(2, rotateNum);
    let xLine = rotateAxisAroundY(XLine, rotateNum);
    normalize = xLine;
    rotateMove(cube_2, YLineR, callback);
}

function f(rotateNum, callback) {
    let cube_2 = getCubeByIndex(2, rotateNum);
    let xLineR = rotateAxisAroundY(XLineR, rotateNum);
    normalize = YLine;
    rotateMove(cube_2, xLineR, callback)
}

function L(rotateNum, callback) {
    let cube_0 = getCubeByIndex(0, rotateNum);
    let zLine = rotateAxisAroundY(ZLine, rotateNum);
    normalize = zLine;
    rotateMove(cube_0, YLineR, callback);
}

function l(rotateNum, callback) {
    let cube_0 = getCubeByIndex(0, rotateNum);
    let zLineR = rotateAxisAroundY(ZLineR, rotateNum);
    normalize = YLine;
    rotateMove(cube_0, zLineR, callback);
}

function D(rotateNum, callback) {
    let cube_8 = getCubeByIndex(8, rotateNum);
    let xLine = rotateAxisAroundY(XLine, rotateNum);
    let zLineR = rotateAxisAroundY(ZLineR, rotateNum);
    normalize = xLine;
    rotateMove(cube_8, zLineR, callback);
}

function d(rotateNum, callback) {
    let cube_8 = getCubeByIndex(8, rotateNum);
    let zLine = rotateAxisAroundY(ZLine, rotateNum);
    let xLineR = rotateAxisAroundY(XLineR, rotateNum);
    normalize = zLine;
    rotateMove(cube_8, xLineR, callback);
}

function R(rotateNum, callback) {
    let cube_2 = getCubeByIndex(2, rotateNum);
    let zLineR = rotateAxisAroundY(ZLineR, rotateNum);
    normalize = YLine;
    rotateMove(cube_2, zLineR, callback);
}

function r(rotateNum, callback) {
    let cube_2 = getCubeByIndex(2, rotateNum);
    let zLine = rotateAxisAroundY(ZLine, rotateNum);
    normalize = zLine;
    rotateMove(cube_2, YLineR, callback);
}

function B(rotateNum, callback) {
    let cube_20 = getCubeByIndex(20, rotateNum);
    let xLine = rotateAxisAroundY(XLine, rotateNum);
    normalize = xLine;
    rotateMove(cube_20, YLine, callback);
}

function b(rotateNum, callback) {
    let cube_20 = getCubeByIndex(20, rotateNum);
    let xLine = rotateAxisAroundY(XLine, rotateNum);
    normalize = xLine;
    rotateMove(cube_20, YLineR, callback);
}

/*
 * run methods in order by index.
 * @param  {[type]}   arr       [method array]
 * @param  {[type]}   index     [current method index]
 * @param  {[type]}   rotateNum [number of rotations]
 * @param  {Function} callback  [callback function after all methods done]
 */
function runMethodAtIndex(arr, index, rotateNum, callback) {
    if (index >= arr.length - 1) {
        if (callback) {
            arr[index](rotateNum, callback);
        } else {
            arr[index](rotateNum);
        }
    } else {
        arr[index](rotateNum, function() {
            if (index < arr.length - 1) {
                index++;
                runMethodAtIndex(arr, index, rotateNum, callback);
            }
        })
    }
}
/*
 * Function to get the cube by index after clockwise rotation around Y
 */
function getCubeByIndex(index, rotateNum) {
    let tempIndex = index;
    let tempRotateNum = rotateNum;
    while (rotateNum > 0) {
        if (parseInt(index / 9) == 0) {
            if (index % 3 == 0) {
                index += 2;
            } else if (index % 3 == 1) {
                index += 10;
            } else if (index % 3 == 2) {
                index += 18;
            }
        } else if (index % 3 == 2) {
            if (parseInt(index / 9) == 0) {
                index += 18;
            } else if (parseInt(index / 9) == 1) {
                index += 8;
            } else if (parseInt(index / 9) == 2) {
                index -= 2;
            }
        } else if (parseInt(index / 9) == 2) {
            if (index % 3 == 2) {
                index -= 2;
            } else if (index % 3 == 1) {
                index -= 10;
            } else if (index % 3 == 0) {
                index -= 18;
            }
        } else if (index % 3 == 0) {
            if (parseInt(index / 9) == 2) {
                index -= 18;
            } else if (parseInt(index / 9) == 1) {
                index -= 8;
            } else if (parseInt(index / 9) == 0) {
                index += 2;
            }
        }
        rotateNum--;
    }
    let cube;
    for (let i = 0; i < cubes.length; i++) {
        if (cubes[i].cubeIndex == index + minCubeIndex) {
            cube = cubes[i];
            break;
        }
    }
    return cube;
}

function getCubesByIndices(indices) {
    let arr = [];
    for (let i = 0; i < indices.length; i++) {
        arr.push(getCubeByIndex(indices[i]));
    }
    return arr;
}

/*
 * Function to get the vector after clockwise rotation around Y
 */
function rotateAxisAroundY(vector, rotateNum) {
    while (rotateNum > 0) {
        if (vector.angleTo(XLine) == 0) {
            vector = ZLineR.clone();
        } else if (vector.angleTo(ZLineR) == 0) {
            vector = XLineR.clone();
        } else if (vector.angleTo(XLineR) == 0) {
            vector = ZLine.clone();
        } else if (vector.angleTo(ZLine) == 0) {
            vector = XLine.clone();
        }
        rotateNum--
    }
    return vector;
}

/*
 * Function to get the color of the opposite face.
 */
function getOppositeColor(index) {
    if (index % 2 == 0 || index == 0) {
        return index + 1;
    } else {
        return index - 1;
    }
}

/*
 * Function to get the color index of the face with target normal.
 */
function getFaceColorByVector(cube, vector) {
    let materials = cube.material.materials;
    let faces = cube.geometry.faces;
    let normalMatrix = cube.normalMatrix;

    /*
     * The normal of the upper face of a cube is Y-axis.
     * Self-Cord Face normal x normalMatrix = viewMatrix
     * vector x invers(viewMatrix) = World-Cord Face Normal
     */
    let viewMatrix = new THREE.Matrix4();
    viewMatrix.lookAt(camera.position, viewCenter, camera.up);
    viewMatrix.getInverse(viewMatrix);
    let tempVector = vector.clone();
    tempVector.applyMatrix4(viewMatrix);
    let angles = [];

    // No equal for float, use min instead
    for (let i = 0; i < faces.length; i++) {
        let tempNormal = faces[i].normal.clone();
        tempNormal.applyMatrix3(normalMatrix);
        angles.push(tempNormal.angleTo(tempVector));
    }
    let minIndex = min(angles).index;
    return faces[minIndex].materialIndex;
}

/*
 * Function to serialize the rubik's cube into 2D format.
 *            ------------
 *            | 36 35 34 |
 *            | 33 32 31 |
 *            | 30 29 28 |
 * --------- ----------- -----------
 * | 43 40 37 |  1  2  3 | 21 24 27 |
 * | 44 41 38 |  4  5  6 | 20 23 26 |
 * | 45 42 39 |  7  8  9 | 19 22 25 |
 *  ---------- ---------- ----------
 *            | 10 11 12 |
 *            | 13 14 15 |
 *            | 16 17 18 |
 *             ----------
 *            | 46 47 48 |
 *            | 49 50 51 |
 *            | 52 53 54 |
 *            ------------
 */
const colorString = ['r', 'o', 'y', 'w', 'b', 'g'];
const FIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const DIndex = [6, 7, 8, 15, 16, 17, 24, 25, 26];
const RIndex = [8, 5, 2, 17, 14, 11, 26, 23, 20];
const UIndex = [2, 1, 0, 11, 10, 9, 20, 19, 18];
const LIndex = [0, 3, 6, 9, 12, 15, 18, 21, 24];
const BIndex = [24, 25, 26, 21, 22, 23, 18, 19, 20];

function serializeCube() {
    let res = [
        [],
        [],
        [],
        [],
        [],
        []
    ];
    for (let i = 0; i < 9; i++) {
        res[0].push(colorString[getFaceColorByVector(getCubeByIndex(FIndex[i]), ZLine)]);
        res[1].push(colorString[getFaceColorByVector(getCubeByIndex(DIndex[i]), YLineR)]);
        res[2].push(colorString[getFaceColorByVector(getCubeByIndex(RIndex[i]), XLine)]);
        res[3].push(colorString[getFaceColorByVector(getCubeByIndex(UIndex[i]), YLine)]);
        res[4].push(colorString[getFaceColorByVector(getCubeByIndex(LIndex[i]), XLineR)]);
        res[5].push(colorString[getFaceColorByVector(getCubeByIndex(BIndex[i]), ZLineR)]);
    }
    return res;
}

function isSolved(serializedRubiksCube) {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            if (serializedRubiksCube[i][j] != serializedRubiksCube[i][j + 1]) return false;
        }
    }
    return true;
}

/**************************** Mouse Event *****************************/
// Get intersection point and the face it belongs to. And the normal vector of this face.
function getIntersects(event) {
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    // Use Raycaster to get the first element among intersected items.
    let intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length) {
        // console.log(intersects);
        try {
            if (intersects[0].object.cubeType === 'coverCube') {
                intersect = intersects[1];
                normalize = intersects[0].face.normal;
            } else {
                intersect = intersects[0];
                normalize = intersects[1].face.normal;
            }
        } catch (err) {}
    }
}

function changeCameraPos(spriteType) {
    // [right, left, up, down, front, back]
    if (spriteType == 'R') {
        camera.position.set(1000, 0, 0);
        camera.up.set(0, 1, 0);
        camera.lookAt(viewCenter);
    }
    if (spriteType == 'L') {
        camera.position.set(-1000, 0, 0);
        camera.up.set(0, 1, 0);
        camera.lookAt(viewCenter);
    }
    if (spriteType == 'U') {
        camera.position.set(0, 1000, 0);
        camera.up.set(0, 1, 0);
        camera.lookAt(viewCenter);
    }
    if (spriteType == 'D') {
        camera.position.set(0, -1000, 0);
        camera.up.set(0, 1, 0);
        camera.lookAt(viewCenter);
    }
    if (spriteType == 'F') {
        camera.position.set(0, 0, 1000);
        camera.up.set(0, 1, 0);
        camera.lookAt(viewCenter);
    }
    if (spriteType == 'B') {
        camera.position.set(0, 0, -1000);
        camera.up.set(0, 1, 0);
        camera.lookAt(viewCenter);
    }
}

function startCubeRotation(event) {
    getIntersects(event);
    // Start cube rotation only when the cube is not rotating and we catch the intersect.
    if (!isRotating && intersect) {
        if (intersect.object.type == "Sprite") { // click sprite
            spriteType = intersect.object.spriteType;
        } else { // rotation
            spriteType = null;
            startPoint = intersect.point; // set starting point of rotation.
        }
        controller.enabled = false; // ignore the controller when we are rotating the cube.
    } else {
        controller.enabled = true;
    }
    isMouseDown = true;
}

// Cube rotation given mouse event.
function rotateCube(event) {
    if (!isMouseDown) return;
    getIntersects(event);
    if (intersect) {
        if (!isRotating && startPoint) {
            movePoint = intersect.point;
            if (!movePoint.equals(startPoint)) { // Rotated.
                let sub = movePoint.sub(startPoint); // get rotation vector.
                rotateMove(intersect.object, sub);
            }
        }
    }
    event.preventDefault();
}

function rotateMove(target, vector, callback) {
    isRotating = true;
    let direction = getDirection(vector); // calculate rotation direction.
    let elements = getCubesToRotate(target, direction);
    window.requestAnimFrame(function(timestamp) {
        rotateAnimation(elements, direction, 0, timestamp, null, 0, callback);
    });
}

function stopCubeRotation() {
    intersect = null;
    startPoint = null;
    isMouseDown = false;
    if (spriteType) {
        let toRotate = spriteType;
        spriteType = null;
        if (toRotate == 1) R();
        if (toRotate == 2) L();
        if (toRotate == 3) U();
        if (toRotate == 4) D();
        if (toRotate == 5) F();
        if (toRotate == 6) B();
        if (toRotate == 7) r();
        if (toRotate == 8) l();
        if (toRotate == 9) u();
        if (toRotate == 10) d();
        if (toRotate == 11) f();
        if (toRotate == 12) b();
        changeCameraPos(toRotate);
    }
}
/**************************** Mouse Event Finished *****************************/

function rotateAroundWorldY(obj, rad) {
    let x0 = obj.position.x;
    let z0 = obj.position.z;
    let q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rad);
    obj.quaternion.premultiply(q);
    // obj.rotateY(rad);
    obj.position.x = Math.cos(rad) * x0 + Math.sin(rad) * z0;
    obj.position.z = Math.cos(rad) * z0 - Math.sin(rad) * x0;
}

function rotateAroundWorldZ(obj, rad) {
    let x0 = obj.position.x;
    let y0 = obj.position.y;
    let q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), rad);
    obj.quaternion.premultiply(q);
    // obj.rotateZ(rad);
    obj.position.x = Math.cos(rad) * x0 - Math.sin(rad) * y0;
    obj.position.y = Math.cos(rad) * y0 + Math.sin(rad) * x0;
}

function rotateAroundWorldX(obj, rad) {
    let y0 = obj.position.y;
    let z0 = obj.position.z;
    let q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rad);
    obj.quaternion.premultiply(q);
    // obj.rotateX(rad);
    obj.position.y = Math.cos(rad) * y0 - Math.sin(rad) * z0;
    obj.position.z = Math.cos(rad) * z0 + Math.sin(rad) * y0;
}

/**
 * Function to animate rotation.
 */
function rotateAnimation(elements, direction, startstamp, currentstamp, laststamp, pausedstamp, callback) {
    let $slider = document.getElementById('slider');
    sliderChange($slider.value);
    allowSliderChange = false;
    let isLastRotateFrame = false;
    if (startstamp === 0) {
        startstamp = currentstamp;
        laststamp = currentstamp;
    }
    if (isPaused) {
        window.requestAnimFrame(function(timestamp) {
            rotateAnimation(elements, direction, startstamp, timestamp, currentstamp, pausedstamp + currentstamp - laststamp, callback);
        });
    } else {
        if (currentstamp - startstamp - pausedstamp >= timePerRotation) { // stop animation.
            currentstamp = startstamp + pausedstamp + timePerRotation;
            isLastRotateFrame = true;
        }
        switch (direction) {
            // Clockwise around X.
            case 1:
                for (let i = 0; i < elements.length; i++) {
                    rotateAroundWorldX(elements[i], 90 * Math.PI / 180 * (currentstamp - laststamp) / timePerRotation);
                }
                break;
                // Counter-Clockwise around X.
            case 2:
                for (let i = 0; i < elements.length; i++) {
                    rotateAroundWorldX(elements[i], -90 * Math.PI / 180 * (currentstamp - laststamp) / timePerRotation);
                }
                break;
                // Clockwise around Y.
            case 3:
                for (let i = 0; i < elements.length; i++) {
                    rotateAroundWorldY(elements[i], -90 * Math.PI / 180 * (currentstamp - laststamp) / timePerRotation);
                }
                break;
                // Counter-Clockwise around Y.
            case 4:
                for (let i = 0; i < elements.length; i++) {
                    rotateAroundWorldY(elements[i], 90 * Math.PI / 180 * (currentstamp - laststamp) / timePerRotation);
                }
                break;
                // Clockwise around Z.
            case 5:
                for (let i = 0; i < elements.length; i++) {
                    rotateAroundWorldZ(elements[i], -90 * Math.PI / 180 * (currentstamp - laststamp) / timePerRotation);
                }
                break;
                // Counter-Clockwise around Z.
            case 6:
                for (let i = 0; i < elements.length; i++) {
                    rotateAroundWorldZ(elements[i], 90 * Math.PI / 180 * (currentstamp - laststamp) / timePerRotation);
                }
                break;
            default:
                break;
        }
        if (!isLastRotateFrame) {
            window.requestAnimFrame(function(timestamp) {
                console.log("window::", timestamp, startstamp);
                rotateAnimation(elements, direction, startstamp, timestamp, currentstamp, pausedstamp, callback);
            });
        } else {
            if (!isShuffle) {
                stepNum++;
                updateStepCounter();
            }
            isRotating = false;
            startPoint = null;
            updateCubeIndex(elements);
            serializedRubiksCube = serializeCube();
            update2DSerializedCube(serializedRubiksCube);
            if (callback) {
                callback();
            } else {
                if (isAutoSolver) {
                    switch (curLBLstep) {
                        case 1:
                            step1();
                            break;
                        case 2:
                            step2();
                            break;
                        case 3:
                            step3();
                            break;
                        case 4:
                            step4();
                            break;
                        case 5:
                            step5();
                            break;
                        case 6:
                            step6();
                            break;
                        case 7:
                            step7();
                            break;
                        case 8:
                            step8();
                            break;
                        default:
                            break;
                    }
                }
            }
            allowSliderChange = true;
        }
    }
}

function updateCubeIndex(elements) {
    for (let i = 0; i < elements.length; i++) {
        let temp1 = elements[i];
        for (let j = 0; j < initStatus.length; j++) {
            let temp2 = initStatus[j];
            if (Math.abs(temp1.position.x - temp2.x) <= cubeParams.len / 2 &&
                Math.abs(temp1.position.y - temp2.y) <= cubeParams.len / 2 &&
                Math.abs(temp1.position.z - temp2.z) <= cubeParams.len / 2) {
                temp1.cubeIndex = temp2.cubeIndex;
                temp1.skipNext = false;
                break;
            }
        }
    }
}

// Function to get all atomic cubes that should be rotated
function getCubesToRotate(target, direction) {
    let targetId = target.cubeIndex - minCubeIndex;
    const Z_Offset = parseInt(targetId / 9);
    const Y_Offset = parseInt((targetId % 9) / 3);
    const X_Offset = parseInt((targetId % 9) % 3);

    let boxs = [];

    switch (direction) {
        // Around X.
        case 1:
        case 2:
            for (let i = 0; i < cubes.length; i++) {
                let tempId = cubes[i].cubeIndex - minCubeIndex;
                if (X_Offset === tempId % 9 % 3) {
                    boxs.push(cubes[i]);
                }
            }
            break;
            // Around Y.
        case 3:
        case 4:
            for (let i = 0; i < cubes.length; i++) {
                let tempId = cubes[i].cubeIndex - minCubeIndex;
                if (Y_Offset === parseInt(tempId % 9 / 3)) {
                    boxs.push(cubes[i]);
                }
            }
            break;
            // Around Z.
        case 5:
        case 6:
            for (let i = 0; i < cubes.length; i++) {
                let tempId = cubes[i].cubeIndex - minCubeIndex;
                if (Z_Offset === parseInt(tempId / 9)) {
                    boxs.push(cubes[i]);
                }
            }
            break;
        default:
            break;
    }
    return boxs;
}

// Function to get rotation direction.
function getDirection(vector3) {
    // calculate angle of vector to x,y,z-axis.
    const XAngle = vector3.angleTo(XLine);
    const XAngleR = vector3.angleTo(XLineR);
    const YAngle = vector3.angleTo(YLine);
    const YAngleR = vector3.angleTo(YLineR);
    const ZAngle = vector3.angleTo(ZLine);
    const ZAngleR = vector3.angleTo(ZLineR);
    const minAngle = min([XAngle, XAngleR, YAngle, YAngleR, ZAngle, ZAngleR]).value;

    let direction;
    switch (minAngle) {
        case XAngle: // Rotate 90 degrees to the positive X.
            if (normalize.equals(YLine)) {
                direction = 5; // Clockwise around Z.
            } else if (normalize.equals(YLineR)) {
                direction = 6; // Counter-Clockwise around Z.
            } else if (normalize.equals(ZLine)) {
                direction = 4; // Counter-Clockwise around Y.
            } else {
                direction = 3; // Clockwise around Y.
            }
            break;
        case XAngleR: // Rotate 90 degrees to the negative X.
            if (normalize.equals(YLine)) {
                direction = 6; // Counter-Clockwise around Z.
            } else if (normalize.equals(YLineR)) {
                direction = 5; // Clockwise around Z.
            } else if (normalize.equals(ZLine)) {
                direction = 3; // Clockwise around Y.
            } else {
                direction = 4; // Counter-Clockwise around Y.
            }
            break;
        case YAngle: // Rotate 90 degrees to the positive Y.
            if (normalize.equals(ZLine)) {
                direction = 2; // Counter-Clockwise around X.
            } else if (normalize.equals(ZLineR)) {
                direction = 1; // Clockwise around X.
            } else if (normalize.equals(XLine)) {
                direction = 6; // Counter-Clockwise around Z.
            } else {
                direction = 5; // Clockwise around Z.
            }
            break;
        case YAngleR: // Rotate 90 degrees to the negative Y.
            if (normalize.equals(ZLine)) {
                direction = 1; // Clockwise around X.
            } else if (normalize.equals(ZLineR)) {
                direction = 2; // Counter-Clockwise around X.
            } else if (normalize.equals(XLine)) {
                direction = 5; // Clockwise around Z.
            } else {
                direction = 6; // Counter-Clockwise around Z.
            }
            break;
        case ZAngle: // Rotate 90 degrees to the positive Z.
            if (normalize.equals(YLine)) {
                direction = 1; // Clockwise around X.
            } else if (normalize.equals(YLineR)) {
                direction = 2; // Counter-Clockwise around X.
            } else if (normalize.equals(XLine)) {
                direction = 3; // Clockwise around Y.
            } else {
                direction = 4; // Counter-Clockwise around Y.
            }
            break;
        case ZAngleR: // Rotate 90 degrees to the negative Z.
            if (normalize.equals(YLine)) {
                direction = 2; // Counter-Clockwise around X.
            } else if (normalize.equals(YLineR)) {
                direction = 1; // Clockwise around X.
            } else if (normalize.equals(XLine)) {
                direction = 4; // Counter-Clockwise around Y.
            } else {
                direction = 3; // Clockwise around Y.
            }
            break;
        default:
            break;
    }
    // console.log(direction);
    return direction;
}

// get min element in an array.
function min(arr) {
    let min = arr[0];
    let index = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            index = i;
        }
    }
    return {
        index: index,
        value: min
    };
}

/*********************************************** End of HELPER functions ***********************************************/
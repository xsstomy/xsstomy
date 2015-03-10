/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var dragonBones;
(function (dragonBones) {
    var TransformUtil = (function () {
        function TransformUtil() {
        }
        TransformUtil.globalToLocal = function (transform, parent) {
            TransformUtil.transformToMatrix(transform, TransformUtil._helpTransformMatrix, true);
            TransformUtil.transformToMatrix(parent, TransformUtil._helpParentTransformMatrix, true);
            TransformUtil._helpParentTransformMatrix.invert();
            TransformUtil._helpTransformMatrix.concat(TransformUtil._helpParentTransformMatrix);
            TransformUtil.matrixToTransform(TransformUtil._helpTransformMatrix, transform, transform.scaleX * parent.scaleX >= 0, transform.scaleY * parent.scaleY >= 0);
        };
        TransformUtil.transformToMatrix = function (transform, matrix, keepScale) {
            if (keepScale === void 0) { keepScale = false; }
            if (keepScale) {
                matrix.a = transform.scaleX * Math.cos(transform.skewY);
                matrix.b = transform.scaleX * Math.sin(transform.skewY);
                matrix.c = -transform.scaleY * Math.sin(transform.skewX);
                matrix.d = transform.scaleY * Math.cos(transform.skewX);
                matrix.tx = transform.x;
                matrix.ty = transform.y;
            }
            else {
                matrix.a = Math.cos(transform.skewY);
                matrix.b = Math.sin(transform.skewY);
                matrix.c = -Math.sin(transform.skewX);
                matrix.d = Math.cos(transform.skewX);
                matrix.tx = transform.x;
                matrix.ty = transform.y;
            }
        };
        TransformUtil.matrixToTransform = function (matrix, transform, scaleXF, scaleYF) {
            transform.x = matrix.tx;
            transform.y = matrix.ty;
            transform.scaleX = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b) * (scaleXF ? 1 : -1);
            transform.scaleY = Math.sqrt(matrix.d * matrix.d + matrix.c * matrix.c) * (scaleYF ? 1 : -1);
            var skewXArray = [];
            skewXArray[0] = Math.acos(matrix.d / transform.scaleY);
            skewXArray[1] = -skewXArray[0];
            skewXArray[2] = Math.asin(-matrix.c / transform.scaleY);
            skewXArray[3] = skewXArray[2] >= 0 ? Math.PI - skewXArray[2] : skewXArray[2] - Math.PI;
            if (Number(skewXArray[0]).toFixed(4) == Number(skewXArray[2]).toFixed(4) || Number(skewXArray[0]).toFixed(4) == Number(skewXArray[3]).toFixed(4)) {
                transform.skewX = skewXArray[0];
            }
            else {
                transform.skewX = skewXArray[1];
            }
            var skewYArray = [];
            skewYArray[0] = Math.acos(matrix.a / transform.scaleX);
            skewYArray[1] = -skewYArray[0];
            skewYArray[2] = Math.asin(matrix.b / transform.scaleX);
            skewYArray[3] = skewYArray[2] >= 0 ? Math.PI - skewYArray[2] : skewYArray[2] - Math.PI;
            if (Number(skewYArray[0]).toFixed(4) == Number(skewYArray[2]).toFixed(4) || Number(skewYArray[0]).toFixed(4) == Number(skewYArray[3]).toFixed(4)) {
                transform.skewY = skewYArray[0];
            }
            else {
                transform.skewY = skewYArray[1];
            }
        };
        TransformUtil.formatRadian = function (radian) {
            //radian %= DOUBLE_PI;
            if (radian > Math.PI) {
                radian -= TransformUtil.DOUBLE_PI;
            }
            if (radian < -Math.PI) {
                radian += TransformUtil.DOUBLE_PI;
            }
            return radian;
        };
        TransformUtil.HALF_PI = Math.PI * 0.5;
        TransformUtil.DOUBLE_PI = Math.PI * 2;
        TransformUtil._helpTransformMatrix = new dragonBones.Matrix();
        TransformUtil._helpParentTransformMatrix = new dragonBones.Matrix();
        return TransformUtil;
    })();
    dragonBones.TransformUtil = TransformUtil;
    TransformUtil.prototype.__class__ = "dragonBones.TransformUtil";
})(dragonBones || (dragonBones = {}));

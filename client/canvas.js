var canvasEl;
var draw = function () {
    let ctx = canvasEl.getContext('2d')
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx = canvasEl.getContext('2d');

    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(426, 0);
    ctx.lineTo(426, 213);
    ctx.lineTo(0, 213);
    ctx.closePath();
    ctx.clip();
    ctx.translate(0, 0);
    ctx.translate(0, 0);
    ctx.scale(1, 1);
    ctx.translate(0, 0);
    ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    ctx.miterLimit = 4;
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.miterLimit = 10;
    ctx.beginPath();
    ctx.moveTo(137.003, 102.011);
    ctx.bezierCurveTo(137.003, 102.011, 118.86499999999998, 114.518, 121.22599999999998, 121.94399999999999);
    ctx.bezierCurveTo(123.58799999999998, 129.369, 151.74699999999999, 125.69899999999998, 151.74699999999999, 125.69899999999998);
    ctx.bezierCurveTo(151.74699999999999, 125.69899999999998, 174.25099999999998, 122.38499999999999, 185.68099999999998, 123.55799999999998);
    ctx.bezierCurveTo(197.112, 124.72999999999998, 200.40599999999998, 116.94699999999997, 188.49999999999997, 108.22999999999998);
    ctx.bezierCurveTo(176.59299999999996, 99.51299999999998, 151.25199999999998, 87.85599999999998, 137.003, 102.01099999999998);
    ctx.closePath();
    ctx.moveTo(212.551, 129.437);
    ctx.bezierCurveTo(212.551, 129.437, 212.908, 135.096, 226.462, 139.92200000000003);
    ctx.bezierCurveTo(240.015, 144.74800000000002, 247.55599999999998, 144.27200000000002, 247.19899999999998, 138.61300000000003);
    ctx.bezierCurveTo(246.84199999999998, 132.95500000000004, 244.124, 119.87000000000003, 232.81199999999998, 120.58400000000003);
    ctx.bezierCurveTo(221.50099999999998, 121.29800000000003, 208.42299999999997, 124.01600000000003, 212.551, 129.43700000000004);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.miterLimit = 10;
    ctx.beginPath();
    ctx.moveTo(86.697, 114.654);
    ctx.bezierCurveTo(87.173, 122.199, 90.01, 137.16899999999998, 109.101, 139.752);
    ctx.bezierCurveTo(128.191, 142.335, 166.839, 139.89600000000002, 186.63400000000001, 138.64700000000002);
    ctx.bezierCurveTo(195.49400000000003, 138.08800000000002, 201.716, 137.69600000000003, 221.52, 151.59600000000003);
    ctx.bezierCurveTo(241.32500000000002, 165.49600000000004, 258.673, 152.47100000000003, 268.53200000000004, 146.73600000000002);
    ctx.bezierCurveTo(278.58000000000004, 140.98900000000003, 294.33000000000004, 135.639, 313.302, 136.336);
    ctx.bezierCurveTo(332.273, 137.032, 331.797, 129.488, 320.24800000000005, 126.42900000000002);
    ctx.bezierCurveTo(308.69800000000004, 123.37000000000002, 277.00600000000003, 131.05100000000002, 263.21400000000006, 122.45300000000002);
    ctx.bezierCurveTo(249.42300000000006, 113.85500000000002, 243.05300000000005, 102.89400000000002, 231.86000000000007, 105.49400000000001);
    ctx.bezierCurveTo(220.66800000000006, 108.09400000000001, 210.88500000000008, 103.03000000000002, 210.88500000000008, 103.03000000000002);
    ctx.bezierCurveTo(210.88500000000008, 103.03000000000002, 163.49700000000007, 71.93400000000001, 140.99300000000008, 75.24700000000001);
    ctx.bezierCurveTo(118.48900000000008, 78.561, 86.20900000000009, 106.92000000000002, 86.69700000000009, 114.65400000000001);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.miterLimit = 10;
    ctx.beginPath();
    ctx.moveTo(64.43, 121.74);
    ctx.bezierCurveTo(64.43, 121.74, 66.21600000000001, 150.033, 96.61800000000001, 151.902);
    ctx.bezierCurveTo(127.02000000000001, 153.771, 170.38, 151.035, 170.38, 151.035);
    ctx.bezierCurveTo(170.38, 151.035, 194.76999999999998, 147.602, 206.676, 156.32);
    ctx.bezierCurveTo(218.583, 165.037, 234.498, 177.289, 258.411, 166.31099999999998);
    ctx.bezierCurveTo(282.324, 155.33399999999997, 291.274, 147.194, 325.327, 146.93899999999996);
    ctx.bezierCurveTo(359.381, 146.68399999999997, 361.147, 144.67899999999997, 351.007, 133.95699999999997);
    ctx.bezierCurveTo(340.866, 123.23399999999997, 324.951, 110.98299999999996, 313.64, 111.69599999999997);
    ctx.bezierCurveTo(302.328, 112.40999999999997, 272.40299999999996, 118.08599999999997, 266.152, 109.01199999999997);
    ctx.bezierCurveTo(259.901, 99.93699999999997, 244.462, 95.23099999999997, 233.15099999999998, 95.94399999999997);
    ctx.bezierCurveTo(221.83899999999997, 96.65799999999997, 217.95, 95.00999999999998, 211.93699999999998, 89.70799999999997);
    ctx.bezierCurveTo(205.92399999999998, 84.40599999999998, 154.765, 53.54799999999997, 126.84399999999998, 60.99099999999997);
    ctx.bezierCurveTo(98.92199999999998, 68.43299999999996, 62.28899999999997, 87.78799999999997, 64.43099999999998, 121.73999999999998);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.miterLimit = 10;
    ctx.beginPath();
    ctx.moveTo(47.107, 117.152);
    ctx.bezierCurveTo(47.107, 117.152, 43.474, 149.574, 55.5, 160.178);
    ctx.bezierCurveTo(67.525, 170.781, 88.319, 164.356, 99.217, 163.1);
    ctx.bezierCurveTo(110.493, 161.821, 131.386, 162.964, 144.582, 162.131);
    ctx.bezierCurveTo(178.517, 159.99, 193.48, 157.152, 211.518, 173.058);
    ctx.bezierCurveTo(229.556, 188.963, 248.29, 185.887, 263.014, 179.277);
    ctx.bezierCurveTo(277.73900000000003, 172.666, 292.107, 160.398, 316.615, 158.851);
    ctx.bezierCurveTo(341.123, 157.305, 373.649, 162.827, 375.058, 155.164);
    ctx.bezierCurveTo(376.467, 147.5, 350.75, 99.886, 328.008, 99.428);
    ctx.bezierCurveTo(305.26599999999996, 98.968, 295.959, 101.45, 295.959, 101.45);
    ctx.bezierCurveTo(295.959, 101.45, 279.111, 104.407, 272.741, 93.446);
    ctx.bezierCurveTo(266.371, 82.48599999999999, 258.711, 81.076, 247.51799999999997, 83.676);
    ctx.bezierCurveTo(236.32599999999996, 86.276, 222.89099999999996, 83.336, 209.09999999999997, 74.737);
    ctx.bezierCurveTo(195.30799999999996, 66.139, 132.83799999999997, 35.99399999999999, 106.80099999999996, 43.318);
    ctx.bezierCurveTo(80.76499999999996, 50.641999999999996, 49.32999999999996, 92.393, 47.10699999999996, 117.152);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.miterLimit = 10;
    ctx.beginPath();
    ctx.moveTo(26.845, 126.005);
    ctx.bezierCurveTo(26.845, 126.005, 18.033, 166.329, 41.489, 178.105);
    ctx.bezierCurveTo(64.945, 189.881, 79.06899999999999, 182.73999999999998, 90.743, 178.784);
    ctx.bezierCurveTo(106.506, 173.624, 122.435, 171.10399999999998, 156.608, 172.73499999999999);
    ctx.bezierCurveTo(190.78, 174.36599999999999, 198.44, 175.77599999999998, 220.487, 195.21599999999998);
    ctx.bezierCurveTo(242.534, 214.65599999999998, 278.929, 191.528, 278.929, 191.528);
    ctx.bezierCurveTo(278.929, 191.528, 305.78, 167.10999999999999, 344.19899999999996, 176.048);
    ctx.bezierCurveTo(382.61799999999994, 184.986, 402.99799999999993, 178.019, 398.1569999999999, 161.281);
    ctx.bezierCurveTo(393.31499999999994, 144.543, 371.7249999999999, 102.35000000000001, 336.83899999999994, 89.40100000000001);
    ctx.bezierCurveTo(298.07499999999993, 74.99400000000001, 293.8349999999999, 97.796, 282.98099999999994, 75.757);
    ctx.bezierCurveTo(272.12699999999995, 53.717000000000006, 264.82399999999996, 57.965, 250.09899999999993, 64.57600000000001);
    ctx.bezierCurveTo(235.37399999999994, 71.186, 217.81199999999993, 62.82600000000001, 217.81199999999993, 62.82600000000001);
    ctx.bezierCurveTo(217.81199999999993, 62.82600000000001, 163.12099999999992, 35.977000000000004, 142.14499999999992, 33.513000000000005);
    ctx.bezierCurveTo(121.16899999999993, 31.049000000000007, 97.35599999999992, 13.615000000000006, 81.81699999999992, 37.32000000000001);
    ctx.bezierCurveTo(66.27799999999992, 61.025000000000006, 34.94299999999992, 74.364, 26.84499999999992, 126.00500000000001);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.miterLimit = 10;
    ctx.beginPath();
    ctx.moveTo(5.631, 119.769);
    ctx.bezierCurveTo(1.72, 138.763, -9.294, 183.203, 27.36, 194.146);
    ctx.bezierCurveTo(64.013, 205.089, 91.815, 195.76, 106.54, 189.14999999999998);
    ctx.bezierCurveTo(121.265, 182.53999999999996, 179.351, 173.194, 205.525, 198.05399999999997);
    ctx.bezierCurveTo(231.699, 222.914, 278.235, 210.509, 299.78700000000003, 192.10599999999997);
    ctx.bezierCurveTo(321.33900000000006, 173.70299999999997, 400.41900000000004, 197.11899999999997, 400.41900000000004, 197.11899999999997);
    ctx.bezierCurveTo(400.41900000000004, 197.11899999999997, 437.07200000000006, 208.06199999999998, 419.25200000000007, 165.63099999999997);
    ctx.bezierCurveTo(401.43300000000005, 123.19999999999997, 374.42600000000004, 85.13599999999997, 334.12200000000007, 76.31699999999998);
    ctx.bezierCurveTo(293.81700000000006, 67.49799999999998, 295.2270000000001, 59.83499999999998, 285.20500000000004, 50.997999999999976);
    ctx.bezierCurveTo(275.184, 42.16199999999998, 262.10600000000005, 44.88099999999998, 247.50000000000006, 53.37799999999998);
    ctx.bezierCurveTo(232.89500000000007, 61.87399999999998, 226.64400000000006, 52.799999999999976, 218.50800000000007, 43.84499999999998);
    ctx.bezierCurveTo(210.37200000000007, 34.88899999999998, 186.79700000000008, 21.22699999999998, 160.28400000000008, 21.006999999999977);
    ctx.bezierCurveTo(133.77200000000008, 20.785999999999976, 128.06800000000007, 20.387999999999977, 120.09900000000007, 14.073999999999977);
    ctx.bezierCurveTo(110.75000000000007, 6.898999999999977, 95.57200000000007, -14.678000000000022, 73.20600000000007, 20.81999999999998);
    ctx.bezierCurveTo(50.840000000000074, 56.317999999999984, 50.706000000000074, 48.18299999999998, 41.29500000000007, 55.02599999999998);
    ctx.bezierCurveTo(21.389, 69.538, 15.734, 69.896, 5.63, 119.77);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.restore();
};

// Update dot locations
var update = function () {

};

// Update and draw
var tick = function () {
    draw();
    update();
    requestAnimationFrame(tick);
};

function create(el) {
    canvasEl = el;

    tick();

}
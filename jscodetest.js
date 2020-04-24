import * as tf from '@tensorflow/tfjs';
const model = await tf.loadLayersModel('./eleven_class/model.json');

const example = tf.fromPixels("table.png");  // for example
const prediction = model.predict(example);

console.log(prediction);

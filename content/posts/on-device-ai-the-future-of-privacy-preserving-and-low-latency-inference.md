---
title: 'On-Device AI: The Future of Privacy-Preserving and Low-Latency Inference'
description: >-
  Dive into the world of on-device AI – a game-changer for smartphones, smart
  homes, and beyond. Learn how it's being deployed and why it's the next big
  thing
date: 2024-06-30T00:00:00.000Z
tags:
  - Machine Learning
  - Deep Learning
  - Artificial Intelligence
  - AI
  - Apple
coverImage: >-
  /images/blog/on-device-ai-the-future-of-privacy-preserving-and-low-latency-inference/cover.png
coverAlt: >-
  On-Device AI: The Future of Privacy-Preserving and Low-Latency Inference cover
  image
seoTitle: 'The AI in Your Pocket: The On-Device AI Story'
seoDescription: >-
  Dive into the world of on-device AI – a game-changer for smartphones, smart
  homes, and beyond. Learn how it's being deployed and why it's the next big
  thing
readTimeInMinutes: 7
---

Recently, I built a Formula 1 Car Classifier that was 89% accurate ([read the blog here!](/writing/building-a-formula-1-car-classifier-with-89-accuracy/)).

And it got me thinking, 

How do I take the model I built and use it on my phone?

Imagine, I could use the ML model that I had trained to recognize the team of an F1 car and use it through my phone's camera without requiring lots of heavy GPUs and an internet connection!

This inspired me to read about how on-device AI works and how to deploy it on my smartphone.

In this article, I will give a high-level overview of:

1. How On-Device AI works.
    
2. Applications of On-Device AI and how you've been using it longer than you might think.
    
3. How to deploy your own ML model on your device
    

Let's dive right in!

# What's The Device Here?

Let's be extremely clear about the definition of a "device" for this blog.

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">Any device with relatively low computing power and is portable is referred to as&nbsp;a<strong> "device"</strong>&nbsp;in this blog.</div>
</div>

Some examples of "device" are:

* SmartPhone
    
* SmartWatch
    
* Microcontrollers (Raspberry Pi, Arduino)
    

# What Is On-Device AI?

Here's what happens when you prompt Chat-GPT to generate some content (Text/Image):

1. You enter the prompt and hit Enter.
    
2. The prompt is sent to a server that hosts ChatGPT, owned by OpenAI.
    
3. Your request is processed, and **an inference** is carried out on your request using the corresponding model of Chat-GPT that you are using.
    
4. The generated response from the model is sent to you over HTTP and shown in the Chat-GPT interface.
    

On-device AI, as the name suggests, is a process that simply takes the server out of the equation and performs **inference** for any ML model on your device (laptop, smartphone, etc).

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>Inference&nbsp;</strong>is the process of using a pre-trained Machine Learning model to make predictions on new, unseen data.</div>
</div>

This **inference** is performed using your data and the computational power available on **your device**. Hence, no internet connection is required.

Today, most modern smartphones come with advanced chips that have dedicated GPUs (Graphical Processing Units) and NPUs (Neural Processing Units).

<div data-node-type="callout">
<div data-node-type="callout-emoji">📱</div>
<div data-node-type="callout-text">The GPUs and NPUs (or Neural Engine in iPhones) provide the necessary&nbsp;<strong>hardware acceleration</strong>&nbsp;for running multiple ML models efficiently on your device.</div>
</div>

For Android, **Qualcomm** is the leading producer of such chips, and Apple produces the **A-series chips for iOS**.

![](/images/blog/on-device-ai-the-future-of-privacy-preserving-and-low-latency-inference/image-01.png)

# What's The Need Of AI On-Device?

Whether you realize it or not, today's AI models are being trained on YOUR data.

Online tools like Chat-GPT may not have the right to retain the documents, images, and text you upload, but they indeed own the output they produce, which can be used for further commercial purposes.

Also, applications like self-driving cars, real-time translation, and speech-to-text require low latency output that cannot be achieved with a round trip to some server.

Here's how on-device AI rises as the perfect solution:

* **Increased Privacy:** Since no round trips to any server are being made, your data stays on your device.
    
* **Low Latency:** Using local computational power and eliminating round trips to the server leads to increased response times.
    
* **Better Personalization:** The AI model uses your data (photos, keyboard input) to improve its results and make them cater to your preferences. 
    
      
    This produces significantly better results than a model trained on random data and isn't particularly personalized for you.
    

# How's AI Being Used On-Device Right Now?

The whole concept of implementing AI on a device isn't new. 

You've been using Machine Learning models that run on devices for longer than you may remember.

Some examples are:

1. **Photo Classification and Face Detection:** The way your photos app can classify photos by location and identify who is present in a particular image by face. All this is done on the device.
    
2. **QR code detector:** When you point your camera to a QR code, it automatically gives you a link to redirect to, regardless of your internet connection.
    
3. **Speech-To-Text:** Most probably, the default keyboard provided by your smartphone has a mic button that allows you to speak, and it automatically enters whatever you say as text. This is done end-to-end on the device unless you're using a 3rd party app.
    
4. **Applying Filters on Video Calls:** You can apply various filters on your face while video calling. This requires models that can implement **Image Segmentation** and separate your face from the rest of the background. Also, since this is usually done on video calls, the model response must be speedy, i.e., extremely low latency. This is done entirely on the device.
    
      
    For instance, the below image shows a filter applied to my face during a Facetime call.
    
    ![](/images/blog/on-device-ai-the-future-of-privacy-preserving-and-low-latency-inference/image-02.jpeg)
    
5. **Digital Handwriting Recognition:** If you've used any note-taking app (like OneNote) that supports a stylus, you must have seen a feature where you can write in your handwriting, which will convert the handwriting into text. This application is also extremely low latency and is achieved entirely on the device.
    

There are many more applications of on-device AI, such as self-driving cars, industrial robots, etc.

# How To Deploy A Regular ML Model On Device?

To deploy a regular tensorflow/keras/pytorch model on your smartphone, you need to convert the model to tensorflow lite format.

**TensorFlow Lite** is a deep learning framework developed by Google that is optimized for running ML models on edge devices.

The file extension of a tensorflow lite model is **.tflite**

Below are the 4 steps to deploy a regular ML model on a device.

## Capture Model Into A Graph

The image below (courtesy: [deeplearning.ai](http://deeplearning.ai)) shows what capturing a basic ML model in a graph means.

![](/images/blog/on-device-ai-the-future-of-privacy-preserving-and-low-latency-inference/image-03.png)

This step is necessary for compiling the captured graph for the device.

## Compile The Model For Device

Once the model is captured as a graph, it's then compiled for a specific device using its corresponding runtime (w.r.t the device OS)

There are specific runtime formats that captured graphs can be compiled for:

* **Qualcomm:** Android Devices
    
* **TensorFlow Lite:** Android/iOS
    
* **ONNX Runtime:** Android/iOS
    
* **CoreML:** iOS
    

## Quantize The Model

Model quantization refers to reducing the size of the model to up to 4x-8x without sacrificing much accuracy.

How can we achieve this?

If it helps, it also didn't occur to me on the first try! But, it's very fundamental.

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">You can simply change the way the weights of the model are represented in memory.</div>
</div>

![](/images/blog/on-device-ai-the-future-of-privacy-preserving-and-low-latency-inference/image-04.png)

The above image (courtesy: [deeplearning.ai](http://deeplearning.ai)) shows how, conceptually, the model size can be reduced by changing the representation of the model weights from float to int.

However, the above image shows a very aggressive quantization.

Changing the model weight representation from float64 to float32 or float16 works fine.

## Evaluate Model Performance

Lastly, you must ensure the model accuracy isn't sacrificed when deploying on the device.

Hence, you must compare the model accuracy, along with any other metric that you're chasing, with the metrics from the cloud (i.e., inference on cloud GPUs)

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>PSNR (Peak Signal to Noise Ratio)</strong>&nbsp;is critical for evaluating computer vision tasks. Any value above&nbsp;<strong>30 dB</strong>&nbsp;for PSNR is considered good.</div>
</div>

# Final Words

On-device AI is a fascinating field.

To develop the implementation of AI on devices, both hardware and software need to push their limits.

This is what excites me. 

Every year, companies like Qualcomm and Apple bring improvements to their chipsets, incorporating more computational power.

Simultaneously, software-oriented companies like OpenAI, Google, Meta, Mistral, and Hugging Face bring improvements to their ML models.

And in this era of personalization, it's the best time to be alive and witness the growth of on-device AI.

---

Congratulations! You've made it to the end of this article 😊

I would love to hear your thoughts about On-Device AI in the comments!

Also, if you learned something new from this article, make sure to let me know in the comments 😁

To read my blogs from your inbox, subscribe to my newsletter below.

---

Want to learn how to use **fine tuning and transfer learning**? Read my article [here](/writing/building-a-formula-1-car-classifier-with-89-accuracy/)

Want to learn how **Convolutional Networks** work? Read my article [here](/writing/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/)

I recreated the **LeNet-5** to achieve 99.8% accuracy on the MNIST dataset. Read my article [here](/writing/recreating-the-lenet-5-998-accuracy-on-mnist-step-by-step-guide/)

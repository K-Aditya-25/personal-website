---
title: >-
  Mastering Convolutional Neural Networks: A Comprehensive Guide from Basics to
  VGG19
description: >-
  Master Convolutional Neural Networks (CNNs) with our guide! Learn about
  convolutions, filters, and VGG19 to enhance your AI skills.
date: 2024-06-17T00:00:00.000Z
tags:
  - CNN
  - Deep Learning
  - Machine Learning
  - neural networks
  - Computer Vision
  - vgg19
  - Data Science
  - techblog
  - convolutional neural networks
seoTitle: >-
  Mastering Convolutional Neural Networks: A Comprehensive Guide from Basics to
  VGG19
seoDescription: >-
  Master Convolutional Neural Networks (CNNs) with our guide! Learn about
  convolutions, filters, and VGG19 to enhance your AI skills.
readTimeInMinutes: 10
---

Let me ask you something. Have you ever wondered how Face Recognition works, how your photos app is able to tell whether you're in the picture or not?

Or, how a self driving car is able to.... drive itself :) How computers are able to place certain dots over a person to map their movement, or how you can do this 👇

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-01.png)

Well, all this, and so much more, is done with the help of **Convnets**, short for Convolutional Neural Networks.

<mark>CNNs are Deep Neural Networks with </mark> **<mark>spatial awareness</mark>**<mark>, which help extracting necessary patterns and features from a given image to perform identification and classification tasks.</mark>

# What Are Convolutions?

As per the [dictionary](https://www.dictionary.com/browse/convolve), to convolve means *"to roll or wind together"* . Convolutional Neural Networks (CNNs) work on this exact principle.

A single layer of a Convnet involves a filter/kernel (*a 1x1, 3x3, 5x5 or 7x7* *matrix*) that convolves, or slides over an input image/matrix, taking the dot product over and over again, to give an output matrix.

Have a look at an example below.

![Image from user vdumoulin on https://github.com/vdumoulin/conv_arithmetic](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-02.gif)

Every element in the **2x2 output matrix** is obtained by taking the dot product of the **filter matrix (3x3)** over a section of the **4x4 input matrix** that is equivalent to a 3x3 section of the input matrix.

This can be seen as the shadow being repeatedly cast over the blue input matrix.

## What Is A Filter?

<mark>A filter is simply a matrix, which when convolved over an image, outputs another matrix that helps detect some pattern in the image.</mark>

For instance, the below filter matrix helps detect a vertical edge in the image.

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-03.png)

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">Carefully notice the values in the above matrix. This represents the colour in an image going from bright to dark! Because as you move towards the right, the pixel intensity value decreases.</div>
</div>

On convolving this filter over an image, it will output a matrix that will clearly show any vertical edges in the image, from light to dark.

Similarly, we can have filters that detect horizontal edges, like the one below

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-04.png)

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">This filter detects horizontal edges since its pixel intensity values depict going from light to dark, as we go up to down.</div>
</div>

## What Are The Parameters In A CNN?

Now that you know what a filter is, <mark>the parameters of a CNN are simply the pixel intensity values of a filter!</mark>

<mark>A CNN is supposed to learn the values of the parameters while training.</mark>

A filter matrix is initialised randomly for every filter.

Through any optimization algorithm (Adam, Batch Gradient Descent etc.) these values are updated after every epoch.

The above filters for vertical and horizontal edge detection are very easy to interpret, hence, you could've easily come up with them.

However, to recognise complex patterns, say a wavy curve, you can not manually come up with an appropriate set of parameters for it.

Hence, the values of parameters are learnt and constantly updated after every epoch. You don't have to come up with them!

## Nature Of A Convolution

<mark>Convolutions are generally downsampling in nature.</mark> They tend to reduce the height and width of a given image.

This is useful in some cases because this relieves the Computational Resources being utilised.

However, this can be harmful in other cases where it constantly loses the image data after every layer since it keeps downsampling.

## How To Control The Extent Of Downsampling?

The size of the output matrix, given an input matrix of size (nxn) and filter of size (fxf) is

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-05.png)

where, <mark>p: padding</mark> and <mark>s: strides</mark>

By controlling the amount of **padding and strides**, we can control the extent of downsampling.

Let's understand what padding and strides are in the context of Convolutions.

### Padding

<mark>Padding helps preserve much of the pixel information from the input layer into the output matrix.</mark>

This is achieved by placing rows and columns of zeros around the original input matrix and performing the convolution operation as usual.

![Image from user vdumoulin on https://github.com/vdumoulin/conv_arithmetic](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-06.gif)

The above image shows a **3x3 filter**, convolving on a **5x5 input image** with **Padding (p) = 2** to give an **output matrix of 5x5.**

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">The above form of padding is called <strong>same padding</strong>, where the size of the input and output image remains the same after convolution. Another type of padding is <strong>valid padding</strong> where <strong>p = 0. </strong>To find the required value of <strong>p</strong> for Same Padding, you can equate the output size (given above) to <strong>n (the input size)</strong>, and mathematically calculate <strong>p</strong>.</div>
</div>

### Strides

In the above images for Convolutions and Padding, you can see that the shadow on the blue input image is moving by 1 block to the right, and 1 block downwards.

Well, the number of blocks by which the shadow (i.e. the filter) moves on the input image is called Stride.

The number of blocks moved by the shadow row-wise can be different to the number of blocks moved column-wise. <mark>Hence, strides are depicted as a (x,y) tuple.</mark>

![Image from user vdumoulin on https://github.com/vdumoulin/conv_arithmetic](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-07.gif)

The above image shows how a **2x2 output matrix** is obtained by convolving a **3x3 filter** on a **5x5 image** with **strides = (2,2).**

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">Notice how the shadow moves 2 blocks to the right and 2 blocks downwards on the input image. Hence strides = (2,2)</div>
</div>

### Is It Possible To Upsample?

Yes! In contrast to the nature of Convolutional Layers, we can upscale the image and increase its height and width in the output matrix.

<mark>This is done by Transpose Convolutions.</mark> More on them in another blog post!

Meanwhile, you can learn about Transpose Convolutions from this fantastic [blog post](https://medium.com/@marsxiang/convolutions-transposed-and-deconvolution-6430c358a5b6) by Mars Xiang on Medium.

# What Are Pooling Layers?

Pooling layers perform some sort aggregation on a particular region of an activation (the output obtained by passing the output of a Conv Layer to an activation function like ReLU).

The output size obtained from a Pooling Layer is the same as the formula given for the output of a convolutional layer.

This implies that the padding and strides of a Pooling Layer can be adjusted accordingly.

Some of the most common aggregation functions are:

1. Max Pooling
    
2. Average Pooling
    

For instance, the image below shows Max Pooling with **2x2 filters** on a **4x4 activation**.

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-08.png)

## Why Is Pooling Required?

### Dimensionality Reduction

Pooling layers help reducing the dimension of the obtained output from any activation layer.

This significantly reduces the computational cost involved in training a CNN.

### Prevent Overfitting

<mark>Every value in the output matrix of a Pooling Layer is representative of a particular section of the input image.</mark>

This reduces the total number of features being passed to the next Convolutional layer and hence, <mark>it has a Regularizing effect</mark>.

This has proven to reduce overfitting on the training dataset.

# What Does a CNN Learn?

<mark>The main job of a CNN is to learn the parameters of the filters in every layer to extract essential features in a given image.</mark>

In general, in a deep CNN, the initial layers learn very intricate details of the image, say, the edges.

The later layers are responsible for learning more complex features like face expressions. Such complex features are learnt on top of the activations of earlier layers.

To visualize what CNNs are learning, an example of an image of houses is given below.

Let's see what are the outputs for the Conv Layer, Activation ReLU, and Max Pooling Layer.

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-09.jpeg)

The above image is greyscaled to pass it as an input to a Conv Layer. This is called Rescaling/Normalization of the image.

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-10.png)

Below, you can see the outputs of individual layers.

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-11.png)

The above image clearly depicts that the Conv Layer is good at detecting edges and boundaries in the image.

The ReLU activation introduces non-linearity in the output of the Conv Layer.

And, the Pooling Layer enhances the features obtained from the Activation Layer.

The python code to achieve the above results can be found at [Geeks For Geeks](https://www.geeksforgeeks.org/introduction-convolution-neural-network/).

# Why Use CNN Over Deep Neural Networks?

There are 3 reasons as to why CNNs are preferred over Deep Neural Networks when working with images:

1. **Spatial Awareness:** CNNs involve convolving filters/kernels over an image which makes them spatially aware about an image.
    
    CNNs preserve the spatial information learnt through every layer and pass it on to the next layer.
    
2. **Parameter Sharing:** A feature detector (such as a vertical edge detector) that’s useful in one part of the image is probably useful in another part of the image.
    
3. **Sparsity Of Connections:** In each layer, each output value
    
    depends only on a small number of inputs.
    

Also, using Convolutions to learn parameters **W,** in-place of Deep Neural networks significantly reduces the total number of parameters to be learnt.

Have a look at the images below that demonstrate exactly that.

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-12.png)

Note, if W = 5\*5 = 25, then 1 is added for the Bias parameter. Hence total parameters in a single filter = 25+1 = 26. And total parameters in 6 filters = 26\*6 = 156

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-13.png)

Here, we flatten the 32x32x3 image to a 1x1x3072 dimension vector in a Fully Connected Dense layer.

And, to get an output of a 28x28x6 image, we have another dense layer of dimensions 1x1x4072.

This amounts to more than 14 Million parameters to be learnt.

Such a computationally expensive task for Dense Layers, can be easily done by Conv Layers.

---

# Summary and Example: VGG19

Simply put, a Convnet performs **Convolutions** and **Transpose Convolutions** (optional) on a given input image.

The responsibility of a convnet is to learn the intricate details about a given image.

Those "details" can be certain edges or patterns in the image, all the way up to learning to recognise complex facial expressions.

The below image shows a popular Image Classification model **VGG19**.

![VGG-19 model structure](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-14.png)

The VGG19 model is an extremely good example to demonstrate how a Convolutional Neural Network looks like.

Here is a brief description of what is happening in the image. This will also help you understand how Convolutions actually happen.

1. **Input Image:** The input image is a RGB image, that is a 224x224x3 tensor.
    
2. **Convolution + ReLU Block:** Each light blue block is a **Convolutional block**. And, <mark>each </mark> **<mark>Convolutional Layer</mark>** <mark> is composed of multiple </mark> **<mark>Convolutional blocks</mark>**<mark>,</mark> as depicted by the image above.
    
    These blocks perform the convolutions on their respective inputs and then apply the ReLU activation on each value of the output obtained from the convolution.
    
    <mark>The number of Convolution Filters in each block can be found from the size of the output image obtained</mark>. For instance, in the 1st layer,
    
    1. There are two Convolutional blocks
        
    2. The size of the output image is 224x224x64.
        
    
    This implies, there are 64 filters in a single block for the 1st layer. Similarly 128 filters in each block of 2nd Convolutional layer, 256 filters in the 3rd Conv layer, and 512 in the 3rd and 4th Conv layers.
    
    Notice, that the size of the output image remains same within a **Convolutional Layer**, that's because **<mark>"same" padding </mark>** <mark>is being used within a </mark> **<mark>Convolutional Layer</mark>.**
    
3. **Max Pooling Layer:** Every yellow block depicts a Max Pooling layer. Generally, this layer is responsible to <mark>halve the height and width of the input image</mark>.
    
    This can clearly be seen in the image, how the height and width changes from 224-&gt;112-&gt;56-&gt;28-&gt;14-&gt;7.
    
    Again, the number of Max Pool filters in each yellow block can be identified from the number of channels of the output image for that block.
    
    In this example, the number of filters in the Max Pool and the Convolutional block are same for every layer.
    
4. **Fully Connected (FC) Layer:** The output of the final Max Pooling Layer (7x7x512) is flattened to a vector of dimension 1x1x25088 and then passed to a FC Layer that outputs an activation of dimension 1x1x4096 (i.e., there are 4096 units in that particular FC Layer).
    
    A FC layer, also known as a Dense layer, is one that contains multiple units (neurons) stacked on top of each other that apply an activation function to an input and give the output.
    

**Softmax Layer:** This is the final prediction layer that contains 1000 units, and outputs a 1x1x1000 tensor that has probabilities for the input image belonging to one of the 1000 labels in the ImageNet dataset.

The below image from taken from article ([**Fully Connected Layers in Convolutional Neural Networks**](https://indiantechwarrior.com/fully-connected-layers-in-convolutional-neural-networks/)) demonstrates the FC Layer and Softmax Layer well.

![](/images/blog/mastering-convolutional-neural-networks-a-comprehensive-guide-from-basics-to-vgg19/image-15.png)

---

You've reached the end of this blog post. If you've made it till here, congratulations!

Now you know how CNNs work and how to get started with them.

All feedback is appreciated in the comments. Subscribe to my [newsletter](https://kharbanda25.hashnode.dev/newsletter) for more such blog posts!

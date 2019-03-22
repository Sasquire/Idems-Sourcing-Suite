# Idem's Sourcing Suite

### [Install](https://raw.githubusercontent.com/Sasquire/on-site-md5-hasher/master/main.user.js)
You must have some user script manager. [Greasy Fork](https://greasyfork.org/en) has a good list. (I use tampermonkey)

### [Examples can be found here](https://imgur.com/a/R96CNCz)

#### What is this?
This is a tool that contains many individual parts. The largest of these is that it will display the md5sum of images on a few  sites. This makes it easy to quickly check if an image was uploaded from a sample and not the full image. It also includes a utility to compare images and see visual differences. As well as a tool that will allow you to upload superior images with ease.

#### Can you say that again, but with more detail?
Sure

#### on-site-md5-hasher
This is what the project initially started out as. A simple program to view the hashes of images to save the janitors on e621 from having to manually download the images each time. This was actually supposed to be a "quick" solution to a larger problem. This part of the tool will show you md5 sums of images, provide links to the image, and even allow you to search e621 for that hash. This part of the tool is fairly straight forward and hopefully easily extensible.

#### [Image comparison](https://e621.net/extensions/image_compare)
This is a simple tool that will allow you to load two images and view the differences between them. There are a few options, but the easiest to use are the defaults of boolean and inverse boolean.

#### [Post BVASer](https://e621.net/extensions/upload_bvas)
This is a reinterpretation of [a tool](https://e621.net/forum/show/87369) originaly made by Munkelzahn. I had received some suggestions for how to improve this tool, and so I added those. On this page you can input a currently known e621 post, the data from that post is then loaded. After you can supply a new image as well as editing tags, sources, and other things. Finally you can upload this post, flag the old one as inferior and do a bunch of things automatically. This tool has worked well for the about ten uploads I have used it for. There are some settings, but you must edit the script for these.

### Q: A:

#### It broke/doesn't work
Create an issue or contact me on e621 and I will try to help as best I can.

#### Why doesn't it support site X?
Send me a suggestion, either on here or on e621 and I will probably add it.

#### I have a great idea!
Create an issue, or even write the code yourself. I like great ideas and I like making great things.

#### What about these permissions? Do you really need send requests to ANY URL?
No I don't, and I wish I didn't need those permissions. I feel the less you need to trust me the better. The only reason I request access to any site for this extension is so the image comparison and post BVASer can function. This is because your web browser is concerned about XSS attacks (and it should be!) so it does not allow me to get values from the canvas I draw the images on, and it does not let me get the md5sum of those images.

#### I really don't like the way you do X
That's a suggestion. See above.

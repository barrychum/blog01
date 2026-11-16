---
title: "Panorama cheat sheet"
date: 2015-05-07
categories: 
  - "photography-2"
---

The following is a step-by-step procedure to produce a Panorama using Lensbaby 5.8mm fisheye, PTGui, and Pano2VR. 1. Capture the images with a Lensbaby 5.8mm

- Take 4 photos at 0,90,180,270 degree at +10 degree pitch up, with the camera in a horizontal position (somehow it messes up in PTGui if the photos are taken with camera vertically!). An alternative is to take 5 photos at 0, 72, 144, 216, 288 degree at +10 degree pitch up. 5 photos will produce a smaller hole for the nadir.
- Take a photo of the nadir at -90 degree pitch (or at a slightly inclined position which can be adjusted using viewpoint correction in PTGui) Try to stand as far from the nadir as possible when taking the nadir, and don't let your own shadow (especially in a sunny day) falls into the nadir.
- Tips : You can take the photos handheld, or using a tripod with a panorama mount. It it important to rotate the camera around the entrance pupil of the lens (the entrance pupil for this Lensbaby is at the position of first glass ) as parallax cannot be fixed in post-processing . Don't need to care about the accuracy of pitch, row and yaw of each photo as PTGui is smart enough to fix them. If taking photos outdoor and the sun is in a photo, make exposure adjustment so the photo will not be too dark (underexposed). Make use of hyper-focus by setting aperture to F8 or F11.

2\. Produce equirectangular panorama in PTGui

- Load the photos, exclude the nair photo, into a PTGui project. The nadir photo will be used at a later stage
- When you load the photos, PTGui should ask you for the lens parameter. Remove the checkbox for auto, select Fisheye lens, and enter 5.8mm for focal length.
- The images should be loaded in PTGui project. Select Advanced button in the first page in PTGui.
- Select Panorama settings tab. Change project to equirectangular. Change Field of view to 360 x 180.
- Select Crop tab. Resize the crop to exclude the undesired parts. Check all the loaded images.
- Select Mask tab. Mask out any parts as needed. This can be done at a later stage after a panorama preview is produced.
- Select the first tab, Project Assistant. Click Align images
- Check the preview.
- Add necessary Control points if needed. It is a good idea to add vertical control points to images. To add vertical control points, select the same image for both left and right, and select the 2 points for a vertical reference respectively.
- Select Optimizer tab. Run Optimizer with Simple parameters.
- Select Exposure tab. Click Optimize now.
- Check the preview. Add necessary control points and rerun Optimizer until good result is obtained.
- Select Source Images tab. Add the nadir image. Check the crop tab for the new nadir image. Mask undesired parts for the nadir image.
- Add control points MANUALLY for the nadir image.
- Select Optimizer tab. Select Advanced. Remove all checkboxes for Optimize globally. Remove all checkboxes for yaw, pitch, roll, viewpoint under Optimize per image, EXCEPT the nadir image. Select yaw, pitch and roll for the nadir. Use Control points for all images. Run Optimizer. If viewpoint adjustment is necessary, select viewpoint for the nadir and do a second Optimizer run.
- Select Create panorama tab. Click set optimize size. Select file format to jpg. Click create panorama. That's it!

3\. Generate VR file from equirectangular panorama.

- Select the equirectangular file produced from PTGui.
- If you need to patch the nadir. Select Convert Input. Change type to cube faces, format to jpg. Click Convert to generate the 6 cube faces. The nadir image should be sequence 5 of the cube face images. Edit the image. After finished editing the image, click Select Input, click Open for the down image, select the edited image and click OK. The project should be updated.
- Adjust Viewing Parameters.
- Select Output format. (Suggest HTML5 or Quicktime) Click Add
- Adjust parameters for output.

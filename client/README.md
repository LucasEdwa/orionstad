
# Video Performance Optimization in Hero Component

## Problem
Previously, the background video in the Hero section was being unmounted and remounted when the logo animation ended. This caused the video to restart or flicker, resulting in a poor user experience and unnecessary performance overhead.

## Solution
The video element is now always mounted in the DOM, regardless of whether the logo animation or the hero content is being shown. Only the overlay (logo or hero content) changes, not the video element itself. This ensures:

- The video loads and plays smoothly without restarting or flickering.
- Improved performance, as the video is not reloaded or re-decoded by the browser.
- A seamless transition between the logo animation and the main hero content.

**Implementation:**
- The `<video>` element is rendered outside the conditional logic for the logo/content overlay.
- Only the overlay (logo or hero content) is conditionally rendered.

This approach provides a better user experience and more efficient resource usage for the landing page animation.

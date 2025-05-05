export async function getCameraSnapshot(cameraId, location_name) {
  return {
    image_url: `https://camera.thongtingiaothong.vn/api/snapshot/${cameraId}`,
    density: (Math.random()).toFixed(2),
  };
}
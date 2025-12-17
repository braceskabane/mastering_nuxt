<template>
  <div class="aspect-video w-full">
    <iframe
      class="w-full h-full"
      :src="videoUrl"
      title="Video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
const props = defineProps({
  videoId: {
    type: [String, Number],
    required: true,
  }
});

const videoUrl = computed(() => {
  // Check if it's a YouTube video ID (11 characters)
  if (String(props.videoId).length === 11) {
    return `https://www.youtube.com/embed/${props.videoId}`;
  }
  // Otherwise assume it's a Vimeo video ID
  return `https://player.vimeo.com/video/${props.videoId}`;
});
</script>

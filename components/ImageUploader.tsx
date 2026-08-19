// ============================================
// fragoulishome.gr — ImageUploader Placeholder Component
// TODO: Implement drag-and-drop image upload with preview + alt-text fields.
// ============================================

"use client";

interface ImageUploaderProps {
  roomId: string;
}

export default function ImageUploader({ roomId }: ImageUploaderProps) {
  // TODO: Accept image files via drag-and-drop or file input.
  // TODO: Show upload progress + preview thumbnails.
  // TODO: Allow setting alt-text per image (SEO).
  // TODO: Call uploadRoomImages() from lib/supabaseClient.
  void roomId;

  return (
    <div className="image-uploader">
      {/* TODO: Drop zone + file input */}
      {/* TODO: Preview grid */}
      {/* TODO: Alt-text input per image */}
      <p>ImageUploader placeholder</p>
    </div>
  );
}
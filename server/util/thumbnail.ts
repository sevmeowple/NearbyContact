import sharp from 'sharp'

export async function generateThumbnail(image: Buffer) {
    return sharp(image).resize(200)
}
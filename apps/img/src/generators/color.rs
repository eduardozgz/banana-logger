use std::io::Cursor;

use actix_web::{HttpResponse, Responder, get, web};
use image::ImageBuffer;

#[get("/color/{color}")]
async fn index(path: web::Path<u32>) -> impl Responder {
    let color = path.into_inner();
    let r: u8 = (color >> 16) as u8 & 0xFF;
    let g: u8 = (color >> 8) as u8 & 0xFF;
    let b: u8 = color as u8 & 0xFF;

    let mut raw_img: ImageBuffer<image::Rgb<u8>, Vec<_>> = image::ImageBuffer::new(32, 32);

    for (_x, _y, pixel) in raw_img.enumerate_pixels_mut() {
        *pixel = image::Rgb::from([r, g, b]);
    }

    let mut png_img: Vec<u8> = Vec::new();
    raw_img
        .write_to(&mut Cursor::new(&mut png_img), image::ImageFormat::Png)
        .unwrap();

    HttpResponse::Ok().content_type("image/png").body(png_img)
}

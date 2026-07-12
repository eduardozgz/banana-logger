use actix_web::{App, HttpServer};

mod generators;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let address = "0.0.0.0";
    let port: u16 = std::env::var("IMG_PORT")
        .unwrap_or("3000".to_string())
        .parse()
        .expect("IMG_PORT must be a valid port number");

    println!("Starting server on port {}", port);
    HttpServer::new(|| App::new().service(generators::color::index))
        .bind((address, port))?
        .run()
        .await
}

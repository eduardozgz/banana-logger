use actix_web::{App, HttpServer};

mod generators;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let address = "0.0.0.0";
    let port = std::env::var("IMG_PORT")
        .unwrap_or("8080".to_string())
        .parse()
        .unwrap();

    println!("Starting server on port {}", port);
    HttpServer::new(|| App::new().service(generators::color::index))
        .bind((address, port))?
        .run()
        .await
}

use actix_web::{App, HttpServer};

mod generators;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(generators::color::index))
        .bind((
            "0.0.0.0",
            std::env::var("IMG_PORT")
                .unwrap_or("8080".to_string())
                .parse()
                .unwrap(),
        ))?
        .run()
        .await
}

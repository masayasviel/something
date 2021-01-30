use std::fs;
use std::env;

fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    let dir_path = if args.len() > 1 {
        &args[1]
    } else {
        "node_modules"
    };
    fs::remove_dir_all(dir_path)?;
    Ok(())
}
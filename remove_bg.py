import sys
from rembg import remove
from PIL import Image

input_path = "public/assets/images/logo.png"
output_path = "public/assets/images/logo.png" # Overwrite it

try:
    input = Image.open(input_path)
    output = remove(input)
    output.save(output_path)
    print("Background removed successfully!")
except Exception as e:
    print(f"Error: {e}")

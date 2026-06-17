import math
from PIL import Image

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # Get the background color from top-left pixel (0,0)
    bg_color = datas[0]
    bg_r, bg_g, bg_b, _ = bg_color
    print(f"Background color detected: R={bg_r}, G={bg_g}, B={bg_b}")
    
    new_data = []
    
    # Thresholds for distance to smooth out anti-aliasing edges
    threshold_low = 35.0
    threshold_high = 75.0
    
    for item in datas:
        r, g, b, a = item
        # Calculate Euclidean distance in RGB space
        dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
        
        if dist < threshold_low:
            # Fully transparent
            new_data.append((0, 0, 0, 0))
        elif dist > threshold_high:
            # Keep original pixel
            new_data.append((r, g, b, a))
        else:
            # Linearly transition alpha to smooth edges
            alpha_ratio = (dist - threshold_low) / (threshold_high - threshold_low)
            new_alpha = int(255 * alpha_ratio)
            new_data.append((r, g, b, new_alpha))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Transparent image saved successfully to {output_path}")

if __name__ == "__main__":
    make_transparent(
        "src/assets/commsynix-logo-dark.jpg",
        "src/assets/commsynix-logo-transparent.png"
    )

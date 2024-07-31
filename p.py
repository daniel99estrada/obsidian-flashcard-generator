import os

def list_src_structure(root_dir, indent=0):
    """Recursively list the folder structure under the 'src' directory."""
    src_dir = os.path.join(root_dir, 'src')
    
    if not os.path.exists(src_dir):
        print(f"The 'src' directory does not exist in {root_dir}.")
        return

    for entry in os.listdir(src_dir):
        path = os.path.join(src_dir, entry)
        if os.path.isdir(path):
            print(' ' * indent + f'📁 {entry}/')
            list_src_structure(path, indent + 4)
        else:
            print(' ' * indent + f'📄 {entry}')

if __name__ == "__main__":
    # Get the directory to scan from the user or set a default
    directory_to_scan = input("Enter the directory path to scan (default is current directory): ").strip()
    if not directory_to_scan:
        directory_to_scan = os.getcwd()

    print(f'Tree structure under the "src" directory in {directory_to_scan}:\n')
    list_src_structure(directory_to_scan)

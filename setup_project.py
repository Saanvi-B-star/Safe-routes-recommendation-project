import os

# Define the folder structure
folders = [
    "data",
    "src",
    "src/backend",
    "src/frontend",
    "docs",
    "scripts",
    "tests"
]

# Define files to create
files = {
    "README.md": "# Safe Routes Recommendation System\n\nA brief description of your project.",
    "LICENSE": "MIT License",
    "requirements.txt": "# Add your Python dependencies here (e.g., Flask, Pandas, etc.)",
    "src/__init__.py": "",
    "src/backend/__init__.py": "",
    "src/frontend/__init__.py": "",
    "tests/__init__.py": "",
    "data/README.md": "# Data Folder\n\nThis folder contains datasets related to the project."
}

# Create folders
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Create files
for file, content in files.items():
    with open(file, "w") as f:
        f.write(content)

print("Project structure created successfully!")

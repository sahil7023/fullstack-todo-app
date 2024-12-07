from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, database

# Create the database tables (make sure your database is set up first)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Add CORS middleware to handle requests from different origins (Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify the exact origins here, e.g., ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Dependency to get the database session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route to create a new todo
@app.post("/todos/", response_model=schemas.TodoResponse)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    db_todo = models.Todo(
        title=todo.title,
        description=todo.description,
        completed=todo.completed,
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

# Route to get all todos
@app.get("/todos/", response_model=list[schemas.TodoResponse])
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(models.Todo).all()
    return todos

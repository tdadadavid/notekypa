## NoteKypa

***

# A simple note-keeping API.

*** 

# Story line
    - Users 
    - Notes


## Users
    - ID.
    - Name.
    - Email.
    - Password.

## Notes.
    - Title
    - note
    - created_at
    - last_update

## Routes
* POST */users* - create a new result
**request body**
```json lines
{
  firstname: string,
  lastname: string,
  email: string,
  password: string
}
```
* GET */users/:id* - Get a result
* PUT */users/:id* - update result

**request body:**
```json lines
{
  name: string,
  email: string,
  password: string
}
```


* DELETE */users/:id -Delete result





* PUT */users/:id/notes* - Create a new note

**request body:**

```json lines
{
  title: string,
  note: string
}
```

* PUT */users/:id/notes/:id* - update note.

**request body:**

```json lines
{
  title: string,
  note: string
}
```

* DELETE */users/:id/notes/:id - delete note



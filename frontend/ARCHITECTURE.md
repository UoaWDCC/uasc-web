# Firestore Architecture

We use [Firestore](https://firebase.google.com/docs/firestore) to manage the database infrastructure. Firestore index rules are currently not set up.

## `users` collection

After a user signs up through the web app, extra information will be populated through this collection on top of the Firebase [User](https://firebase.google.com/docs/auth/users) object.

| **Field**          | **Type**  | **Example Value**          |
| ------------------ | --------- | -------------------------- |
| date_of_birth      | timestamp | 1 January 1970 at 00:00:00 |
| does_freestyle     | boolean   | true                       |
| does_racing        | boolean   | false                      |
| does_ski           | boolean   | true                       |
| emergency_name     | string    | Jane Doe                   |
| emergency_phone    | string    | 123 456 789                |
| emergency_relation | string    | Friend                     |
| first_name         | string    | John                       |
| last_name          | string    | Doe                        |
| membership         | string    | "admin" or "member"        |

## `demographics` collection

Users may contain metadata which is not strictly necessary and may be optionally entered by them. This collection tracks this information.

| **Field**       | **Type** | **Example Value** |
| --------------- | -------- | ----------------- |
| faculty         | string   | Engineering       |
| gender          | string   | female            |
| second_faculty  | string   | Software          |
| student_id      | string   | 123456789         |
| university_year | string   | 3rd               |

## `requests` collection

This manages all requests by users to the executive team at UASC.

| **Field**     | **Type**  | **Example Value**                   |
| ------------- | --------- | ----------------------------------- |
| user_id       | reference | /users/lVsOjAp06AfD6atT8bnrVEpcdcg2 |
| booking_id    | reference | /bookings/8mYj7rWOMH6hGy4FzMed      |
| query         | string    | Hello, when is your next event?     |
| query_type    | string    | cancellation                        |
| status        | string    | unresolved                          |
| creation_time | timestamp | 1970-01-01T00:00:00Z                |

- `query_type` allows for future different query types. Possible query types
  are
  - `cancellation`
  - `dateChange`
- `status` indicates the status of the query for the executive team to see (can
  be `unresolved` or `resolved`)

Additional fields may be specified, depending on the `query_type`, as follows:

### `cancellation` request

Has no additional fields specified.

### `dateChange` request

The following additional fields are specified:

| **Field**     | **Type**  | **Example Value** |
| ------------- | --------- | ----------------- |
| old_check_in  | timestamp | 25-07-2023        |
| old_check_out | timestamp | 27-07-2023        |
| new_check_in  | timestamp | 26-07-2023        |
| new_check_out | timestamp | 28-07-2023        |

Implementors should ensure that the range between
`old_check_out - old_check_in` and `new_check_out` - `new_check_in` do not
differ (i.e., the amount of days in the booking does not change).

Because Firebase does not have a timestamp without time, ensure that time is set to midnight.

## `bookings` collection

This manages the link between users and booking IDs, and references the current
check-in and check-out dates of the booking.

| **Field** | **Type**  | **Example Value**                   |
| --------- | --------- | ----------------------------------- |
| user_id   | reference | /users/lVsOjAp06AfD6atT8bnrVEpcdcg2 |
| check_in  | timestamp | 26-07-2023                          |
| check_out | timestamp | 26-07-2023                          |

Times of timestamps should be set to midnight.

## `booking_changes` collection

This manages any changes that have happened to a specific booking.

This collection primarily exists to have a documented record of any changes
applied to a booking.

| **Field**     | **Type**  | **Example Value**              |
| ------------- | --------- | ------------------------------ |
| booking_id    | reference | /bookings/8mYj7rWOMH6hGy4FzMed |
| old_check_in  | timestamp | 26-07-2023                     |
| old_check_out | timestamp | 26-07-2023                     |
| new_check_in  | timestamp | 27-07-2023                     |
| new_check_out | timestamp | 27-07-2023                     |

Times of timestamps should be set to midnight.

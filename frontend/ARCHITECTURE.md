# Firestore Architecture

We use [Firestore](https://firebase.google.com/docs/firestore) to manage the database infrastructure.

## `requests` collection

This manages all requests by users to the executive team at UASC.

| **Field**     | **Type**  | **Example Value**               |
| ------------- | --------- | ------------------------------- |
| user_id       | string    | lVsOjAp06AfD6atT8bnrVEpcdcg2    |
| booking_id    | string    | 8mYj7rWOMH6hGy4FzMed            |
| query         | string    | Hello, when is your next event? |
| query_type    | string    | cancellation                    |
| status        | string    | unresolved                      |
| creation_time | timestamp | 1970-01-01T00:00:00Z            |

- `query_type` allows for future different query types. Possible query types
  are - `cancellation` - `dateChange`
- `status` indicates the status of the query for the executive team to see (can
  be `unresolved` or `resolved`)

Additional fields may be specified, depending on the `query_type`.

### `cancellation` request

Has no additional fields specified.

### `dateChange` request

The following additional fields are specified:

| **Field**      | **Type**  | **Example Value** |
| -------------- | --------- | ----------------- |
| old_start_date | Timestamp | 25-07-2023        |
| old_end_date   | Timestamp | 27-07-2023        |
| new_start_date | Timestamp | 26-07-2023        |
| new_end_date   | Timestamp | 28-07-2023        |

Implementors should ensure that the range between
`old_end_date - old_start_date` and `new_end_date` - `new_start_date` do not
differ (i.e., the amount of days in the booking does not change).

## `bookings` collection

This manages the link between users and booking IDs, and references the current
check-in and check-out dates of the booking.

| **Field**       | **Type**    | **Example Value**                 |
| --------------- | ----------- | --------------------------------- |
| --------------- | ----------- | --------------------------------- |
| user_id         | string      | lVsOjAp06AfD6atT8bnrVEpcdcg2      |
| check_in        | Timestamp   | 26-07-2023                        |
| check_out       | Timestamp   | 26-07-2023                        |

## `booking_changes` collection

This manages any changes that have happened to a specific booking.

This collection primarily exists to have a documented record of any changes
applied to a booking.

| **Field**       | **Type**    | **Example Value**                 |
| --------------- | ----------- | --------------------------------- |
| --------------- | ----------- | --------------------------------- |
| booking_id      | string      | 8mYj7rWOMH6hGy4FzMed              |
| old_check_in    | Timestamp   | 26-07-2023                        |
| old_check_out   | Timestamp   | 26-07-2023                        |
| new_check_in    | Timestamp   | 27-07-2023                        |
| new_check_out   | Timestamp   | 27-07-2023                        |

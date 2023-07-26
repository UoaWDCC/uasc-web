# Firestore Architecture
We use [Firestore](https://firebase.google.com/docs/firestore) to manage all the 
## `requests` collection
This manages all requests by users to the executive team at UASC.

| **Field** 		| **Type** 	| **Example Value**               	|
|------------------	|----------	|---------------------------------	|
| email     		| string   	| name@domain.com                 	|
| query     		| string   	| Hello, when is your next event? 	|
| query_type 		| string   	| email                           	|
| status			| string	| unresolved						|
| creation_time		| timestamp	| 1970-01-01T00:00:00Z				|

- `queryType` allows for future different query types (for example, making a request to change the dates of a booking).
- `status` indicates the status of the query for the executive team to see (can be `unresolved`, `resolved`)

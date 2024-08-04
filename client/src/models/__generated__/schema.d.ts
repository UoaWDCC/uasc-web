/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/users/self": {
    /** @description Fetches users additional info based on their uid. */
    get: operations["GetSelf"];
  };
  "/users/edit-self": {
    /** @description Edits the user's additional info based on their uid. */
    patch: operations["EditSelf"];
  };
  "/users/delete-user": {
    /** @description Deletes a user based on their uid. This requires an admin JWT token. */
    delete: operations["DeleteUser"];
  };
  "/webhook": {
    /**
     * @description Webhook endpoint for Stripe events.
     * This single endpoint is setup in the Stripe developer config to handle various events.
     */
    post: operations["ReceiveWebhook"];
  };
  "/signup": {
    /** @description Signs up a user and creates a user record in the database. Also creates a JWT token for the user in AuthService. */
    post: operations["Signup"];
  };
  "/payment/membership_prices": {
    /** @description Fetches the prices of the membership products from Stripe. */
    get: operations["GetMembershipPrices"];
  };
  "/payment/checkout_status": {
    /** @description Fetches the details of a checkout session based on a stripe checkout session id. */
    get: operations["GetCheckoutSessionDetails"];
  };
  "/payment/membership": {
    /** @description Creates a checkout session for membership payment. */
    post: operations["GetMembershipPayment"];
  };
  "/payment/booking": {
    /**
     * @description Creates a new booking session for the date ranges passed in,
     * will return any existing sessions if they have been started in
     * the last 30 minutes (the minimum period stripe has to persist a session for)
     */
    post: operations["GetBookingPayment"];
  };
  "/bookings": {
    /** @description Fetches all bookings for a user based on their UID. */
    get: operations["GetAllBookings"];
  };
  "/bookings/available-dates": {
    /** @description Fetches all available booking dates within a date range. */
    post: operations["GetAvailableDates"];
  };
  "/bookings/fetch-users": {
    /**
     * @description This method fetches users based on a booking date range.
     * This method requires an admin JWT token.
     */
    post: operations["FetchUsersByBookingDateRange"];
  };
  "/admin/bookings/make-dates-available": {
    /** @description Booking Operations */
    post: operations["MakeDateAvailable"];
  };
  "/admin/bookings/make-dates-unavailable": {
    /** @description Decreases availability count to 0 for all booking slots in a date range. */
    post: operations["MakeDateUnavailable"];
  };
  "/admin/bookings/create": {
    /** @description An admin method to create bookings for a list of users within a date range. */
    post: operations["CreateBookings"];
  };
  "/admin/bookings/delete": {
    /** @description Delete a users booking by booking ID. */
    post: operations["RemoveBooking"];
  };
  "/admin/users": {
    /** @description User Operations */
    get: operations["GetAllUsers"];
  };
  "/admin/users/{uid}": {
    /**
     * @description Get a user by their UID.
     * Requires an admin JWT token.
     */
    get: operations["GetUser"];
  };
  "/admin/users/create": {
    /**
     * @description Adds a new user to the database with their UID and user data.
     * Requires an admin JWT token.
     */
    put: operations["CreateUser"];
  };
  "/admin/users/bulk-edit": {
    /**
     * @description Edits a list of users with updated user additional info.
     * Requires an admin JWT token.
     */
    patch: operations["EditUsers"];
  };
  "/admin/users/promote": {
    /**
     * @description Promotes a user to a member. This returns a conflict when the user is already a member.
     * Requires an admin JWT token.
     */
    put: operations["PromoteUser"];
  };
  "/admin/users/demote": {
    /**
     * @description Demotes a member to a guest. This returns a conflict when the user is already a guest.
     * Requires an admin JWT token.
     */
    put: operations["DemoteUser"];
  };
  "/admin/users/demote-all": {
    /**
     * @description Demotes all non-admin users to guests. This is used to purge all membership statuses at the end of a billing cycle.
     * Requires an admin JWT token.
     */
    patch: operations["DemoteAllUsers"];
  };
  "/admin/users/add-coupon": {
    /**
     * @description Adds a coupon to a user's stripe id.
     * Requires an admin JWT token.
     */
    post: operations["AddCoupon"];
  };
  "/admin/bookings/history": {
    /** @description Fetches the **latest** booking history events (uses cursor-based pagination) */
    post: operations["GetLatestHistory"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * @description A Timestamp represents a point in time independent of any time zone or
     * calendar, represented as seconds and fractions of seconds at nanosecond
     * resolution in UTC Epoch time. It is encoded using the Proleptic Gregorian
     * Calendar which extends the Gregorian calendar backwards to year one. It is
     * encoded assuming all minutes are 60 seconds long, i.e. leap seconds are
     * "smeared" so that no leap second table is needed for interpretation. Range
     * is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z.
     */
    "FirebaseFirestore.Timestamp": {
      /**
       * Format: double
       * @description The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
       */
      seconds: number;
      /**
       * Format: double
       * @description The non-negative fractions of a second at nanosecond resolution.
       */
      nanoseconds: number;
    };
    /** @description From T, pick a set of properties whose keys are in the union K */
    "Pick_Partial_UserAdditionalInfo_.Exclude_keyofPartial_UserAdditionalInfo_.stripe_id__": {
      date_of_birth?: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding?: boolean;
      does_racing?: boolean;
      does_ski?: boolean;
      /** Format: double */
      phone_number?: number;
      gender?: string;
      emergency_contact?: string;
      first_name?: string;
      last_name?: string;
      dietary_requirements?: string;
      /** @description **OPTIONAL** field that the user should have the choice to provide */
      ethnicity?: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      university_year?: string;
    };
    /** @description Construct a type with the properties of T except for those in type K. */
    "Omit_Partial_UserAdditionalInfo_.stripe_id_": components["schemas"]["Pick_Partial_UserAdditionalInfo_.Exclude_keyofPartial_UserAdditionalInfo_.stripe_id__"];
    EditSelfRequestBody: {
      updatedInformation: components["schemas"]["Omit_Partial_UserAdditionalInfo_.stripe_id_"];
    };
    CommonResponse: {
      error?: string;
      message?: string;
    };
    DeleteUserRequestBody: {
      uid: string;
    };
    UserSignupResponse: {
      error?: string;
      message?: string;
      jwtToken?: string;
      uid?: string;
    };
    /** @description From T, pick a set of properties whose keys are in the union K */
    "Pick_UserAdditionalInfo.Exclude_keyofUserAdditionalInfo.stripe_id__": {
      date_of_birth: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding?: boolean;
      does_racing?: boolean;
      does_ski?: boolean;
      /** Format: double */
      phone_number: number;
      gender?: string;
      emergency_contact?: string;
      first_name: string;
      last_name: string;
      dietary_requirements: string;
      /** @description **OPTIONAL** field that the user should have the choice to provide */
      ethnicity?: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      university_year?: string;
    };
    /** @description Construct a type with the properties of T except for those in type K. */
    "Omit_UserAdditionalInfo.stripe_id_": components["schemas"]["Pick_UserAdditionalInfo.Exclude_keyofUserAdditionalInfo.stripe_id__"];
    UserSignupBody: {
      email: string;
      user: components["schemas"]["Omit_UserAdditionalInfo.stripe_id_"];
    };
    /** @enum {string} */
    MembershipTypeValues: "uoa_student" | "non_uoa_student" | "returning_member" | "new_non_student";
    MembershipStripeProductResponse: {
      error?: string;
      message?: string;
      data?: {
          originalPrice?: string;
          displayPrice: string;
          discount: boolean;
          description?: string;
          name: components["schemas"]["MembershipTypeValues"];
          productId: string;
        }[];
    };
    /** @enum {string} */
    "stripe.Stripe.Checkout.Session.Status": "complete" | "expired" | "open";
    /** @description Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. */
    "stripe.Stripe.Metadata": {
      [key: string]: string;
    };
    MembershipPaymentResponse: {
      error?: string;
      message?: string;
      stripeClientSecret?: string;
      membershipType?: components["schemas"]["MembershipTypeValues"];
    };
    UserPaymentRequestModel: {
      membershipType?: components["schemas"]["MembershipTypeValues"];
    };
    BookingPaymentResponse: {
      error?: string;
      message?: string;
      stripeClientSecret?: string;
    };
    UserBookingRequestingModel: {
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      startDate?: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      endDate?: components["schemas"]["FirebaseFirestore.Timestamp"];
    };
    AllUserBookingSlotsResponse: {
      error?: string;
      message?: string;
      dates?: string[];
    };
    AvailableDates: {
      /** Format: double */
      availableSpaces: number;
      /** Format: double */
      maxBookings: number;
      date: components["schemas"]["FirebaseFirestore.Timestamp"];
      description?: string;
      id: string;
    };
    AvailableDatesResponse: {
      error?: string;
      message?: string;
      data?: components["schemas"]["AvailableDates"][];
    };
    AvailableDatesRequestModel: {
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      startDate?: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      endDate?: components["schemas"]["FirebaseFirestore.Timestamp"];
    };
    /** @enum {string} */
    UserAccountTypes: "admin" | "member" | "guest";
    BookingIdandUserData: {
      date_of_birth: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding?: boolean;
      does_racing?: boolean;
      does_ski?: boolean;
      /** Format: double */
      phone_number: number;
      gender?: string;
      emergency_contact?: string;
      first_name: string;
      last_name: string;
      dietary_requirements: string;
      /** @description **OPTIONAL** field that the user should have the choice to provide */
      ethnicity?: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      university_year?: string;
      /** @description For identification DO NOT RETURN to users in exposed endpoints */
      stripe_id?: string;
      /** @description Firebase identifier of the user *data* based on the firestore document */
      uid: string;
      /** @description Formatted UTC date string of when the account was created */
      dateJoined?: string;
      /** @description The email the user uses to log in */
      email: string;
      /** @description What type of account the user has */
      membership: components["schemas"]["UserAccountTypes"];
      bookingId: string;
    };
    /** @description Represents the response structure for fetching users by date range. */
    UsersByDateRangeResponse: {
      data?: {
          users: components["schemas"]["BookingIdandUserData"][];
          date: components["schemas"]["FirebaseFirestore.Timestamp"];
        }[];
      error?: string;
    };
    /** @description Represents the structure of a request model for fetching bookings within a specific date range. */
    BookingsByDateRangeRequestModel: {
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      startDate: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      endDate: components["schemas"]["FirebaseFirestore.Timestamp"];
    };
    BookingSlotUpdateResponse: {
      error?: string;
      message?: string;
      updatedBookingSlots?: {
          bookingSlotId: string;
          date: components["schemas"]["FirebaseFirestore.Timestamp"];
        }[];
    };
    MakeDatesAvailableRequestBody: {
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      startDate: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      endDate: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** Format: double */
      slots?: number;
    };
    /** @description From T, pick a set of properties whose keys are in the union K */
    "Pick_MakeDatesAvailableRequestBody.Exclude_keyofMakeDatesAvailableRequestBody.slots__": {
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      startDate: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      endDate: components["schemas"]["FirebaseFirestore.Timestamp"];
    };
    /** @description Construct a type with the properties of T except for those in type K. */
    "Omit_MakeDatesAvailableRequestBody.slots_": components["schemas"]["Pick_MakeDatesAvailableRequestBody.Exclude_keyofMakeDatesAvailableRequestBody.slots__"];
    /** @description Represents the response structure for fetching user ids by date range. */
    UIdssByDateRangeResponse: {
      data?: {
          users: string[];
          date: components["schemas"]["FirebaseFirestore.Timestamp"];
        }[];
      error?: string;
    };
    CreateBookingsRequestModel: {
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      startDate: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description Firestore timestamp, should represent a UTC date that is set to exactly midnight */
      endDate: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description List of users to add to the bookings between date range */
      userId: string;
    };
    BookingDeleteResponse: {
      error?: string;
      message?: string;
      user_id?: string;
    };
    DeleteBookingRequest: {
      bookingID: string;
    };
    CombinedUserData: {
      date_of_birth: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding?: boolean;
      does_racing?: boolean;
      does_ski?: boolean;
      /** Format: double */
      phone_number: number;
      gender?: string;
      emergency_contact?: string;
      first_name: string;
      last_name: string;
      dietary_requirements: string;
      /** @description **OPTIONAL** field that the user should have the choice to provide */
      ethnicity?: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      university_year?: string;
      /** @description For identification DO NOT RETURN to users in exposed endpoints */
      stripe_id?: string;
      /** @description Firebase identifier of the user *data* based on the firestore document */
      uid: string;
      /** @description Formatted UTC date string of when the account was created */
      dateJoined?: string;
      /** @description The email the user uses to log in */
      email: string;
      /** @description What type of account the user has */
      membership: components["schemas"]["UserAccountTypes"];
    };
    AllUsersResponse: {
      error?: string;
      message?: string;
      /**
       * @description Needed for firestore operations which do not support offset
       * based pagination
       *
       * **Will be undefined in case of last page**
       */
      nextCursor?: string;
      data?: components["schemas"]["CombinedUserData"][];
    };
    GetUserResponse: {
      error?: string;
      message?: string;
      data?: components["schemas"]["CombinedUserData"];
    };
    UserAdditionalInfo: {
      date_of_birth: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding?: boolean;
      does_racing?: boolean;
      does_ski?: boolean;
      /** Format: double */
      phone_number: number;
      gender?: string;
      emergency_contact?: string;
      first_name: string;
      last_name: string;
      dietary_requirements: string;
      /** @description **OPTIONAL** field that the user should have the choice to provide */
      ethnicity?: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      university_year?: string;
      /** @description For identification DO NOT RETURN to users in exposed endpoints */
      stripe_id?: string;
    };
    CreateUserRequestBody: {
      uid: string;
      user: components["schemas"]["UserAdditionalInfo"];
    };
    /** @description Make all properties in T optional */
    Partial_UserAdditionalInfo_: {
      date_of_birth?: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding?: boolean;
      does_racing?: boolean;
      does_ski?: boolean;
      /** Format: double */
      phone_number?: number;
      gender?: string;
      emergency_contact?: string;
      first_name?: string;
      last_name?: string;
      dietary_requirements?: string;
      /** @description **OPTIONAL** field that the user should have the choice to provide */
      ethnicity?: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      university_year?: string;
      /** @description For identification DO NOT RETURN to users in exposed endpoints */
      stripe_id?: string;
    };
    EditUsersRequestBody: {
      users: {
          updatedInformation: components["schemas"]["Partial_UserAdditionalInfo_"];
          uid: string;
        }[];
    };
    PromoteUserRequestBody: {
      uid: string;
    };
    DemoteUserRequestBody: {
      uid: string;
    };
    AddCouponRequestBody: {
      /** @description The UID of the user to whom the coupon will be added. */
      uid: string;
      /**
       * Format: double
       * @description The number of the coupon to be added.
       */
      quantity: number;
    };
    /** @description Event used to track a user being **manually** added to a booking (only possible via admin view) */
    BookingAddedEvent: {
      /** @description The time which the booking operation was performed. MUST be in UTC format */
      timestamp: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description The start of the operated on date range */
      start_date: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description The end of the operated on date range */
      end_date: components["schemas"]["FirebaseFirestore.Timestamp"];
      /**
       * @description The type of event that the admin performed, used for parsing on the front-end
       *
       * Each of these are associated with the following:
       *
       * - `"added_user_to_booking"`: {@link BookingAddedEvent}
       * - `"removed_user_from_booking"`: {@link BookingDeletedEvent}
       * - `"changed_date_availability"`: {@link BookingAvailabilityChangeEvent}
       * @enum {string}
       */
      event_type: "added_user_to_booking";
      /** @description The id corresponding to the user who had a **manually** added booking */
      uid: string;
    };
    /** @description Event used to track the removal of a user from a date range (only possible via admin view) */
    BookingDeletedEvent: {
      /** @description The time which the booking operation was performed. MUST be in UTC format */
      timestamp: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description The start of the operated on date range */
      start_date: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description The end of the operated on date range */
      end_date: components["schemas"]["FirebaseFirestore.Timestamp"];
      /**
       * @description The type of event that the admin performed, used for parsing on the front-end
       *
       * Each of these are associated with the following:
       *
       * - `"added_user_to_booking"`: {@link BookingAddedEvent}
       * - `"removed_user_from_booking"`: {@link BookingDeletedEvent}
       * - `"changed_date_availability"`: {@link BookingAvailabilityChangeEvent}
       * @enum {string}
       */
      event_type: "removed_user_from_booking";
      /** @description The id corresponding to the user who had a **manually** deleted booking */
      uid: string;
    };
    /** @description Event used to track the history of the availability of dates changing */
    BookingAvailabilityChangeEvent: {
      /** @description The time which the booking operation was performed. MUST be in UTC format */
      timestamp: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description The start of the operated on date range */
      start_date: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description The end of the operated on date range */
      end_date: components["schemas"]["FirebaseFirestore.Timestamp"];
      /**
       * @description The type of event that the admin performed, used for parsing on the front-end
       *
       * Each of these are associated with the following:
       *
       * - `"added_user_to_booking"`: {@link BookingAddedEvent}
       * - `"removed_user_from_booking"`: {@link BookingDeletedEvent}
       * - `"changed_date_availability"`: {@link BookingAvailabilityChangeEvent}
       * @enum {string}
       */
      event_type: "changed_date_availability";
      /**
       * Format: double
       * @description The **signed** difference between the newly available slots and the previously available slots.
       *
       * For example, if the original available slots was 32, and the availability was set to 0,
       * the `change` in the slots needs to be **0 - 32 = -32**
       *
       * And vice versa, if the original available slots was 16, and the availability was set to 32,
       * the `change` would be **32 - 16 = 16**
       */
      change: number;
    };
    /** @description Helper type to specify the possible datastruces for the booking history */
    BookingHistoryEvent: components["schemas"]["BookingAddedEvent"] | components["schemas"]["BookingDeletedEvent"] | components["schemas"]["BookingAvailabilityChangeEvent"];
    FetchLatestBookingHistoryEventResponse: {
      /**
       * @description Needed for firestore operations which do not support offset
       * based pagination
       *
       * **Will be undefined in case of last page**
       */
      nextCursor?: string;
      error?: string;
      message?: string;
      historyEvents?: components["schemas"]["BookingHistoryEvent"][];
    };
    FetchLatestBookingEventRequest: {
      /** Format: double */
      limit: number;
      /** @description The id of the cursor to continue paginating from */
      cursor?: string;
    };
  };
  responses: {
  };
  parameters: {
  };
  requestBodies: {
  };
  headers: {
  };
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** @description Fetches users additional info based on their uid. */
  GetSelf: {
    responses: {
      /** @description Fetched self data */
      200: {
        content: {
          "application/json": {
            stripe_id?: string;
            university_year?: string;
            student_id?: string;
            university?: string;
            faculty?: string;
            ethnicity?: string;
            dietary_requirements: string;
            last_name: string;
            first_name: string;
            emergency_contact?: string;
            gender?: string;
            /** Format: double */
            phone_number: number;
            does_ski?: boolean;
            does_racing?: boolean;
            does_snowboarding?: boolean;
            date_of_birth: components["schemas"]["FirebaseFirestore.Timestamp"];
            uid: string;
          };
        };
      };
    };
  };
  /** @description Edits the user's additional info based on their uid. */
  EditSelf: {
    /** @description - The updated user additional info, note that the stripe_id is omitted. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["EditSelfRequestBody"];
      };
    };
    responses: {
      /** @description Successful edit */
      200: {
        content: never;
      };
    };
  };
  /** @description Deletes a user based on their uid. This requires an admin JWT token. */
  DeleteUser: {
    /** @description - The uid of the user to be deleted. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["DeleteUserRequestBody"];
      };
    };
    responses: {
      /** @description Deleted user */
      200: {
        content: {
          "application/json": unknown;
        };
      };
    };
  };
  /**
   * @description Webhook endpoint for Stripe events.
   * This single endpoint is setup in the Stripe developer config to handle various events.
   */
  ReceiveWebhook: {
    responses: {
      /** @description Webhook post received */
      200: {
        content: never;
      };
    };
  };
  /** @description Signs up a user and creates a user record in the database. Also creates a JWT token for the user in AuthService. */
  Signup: {
    /** @description - The user's email and their user additional info. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserSignupBody"];
      };
    };
    responses: {
      /** @description Signup successful */
      200: {
        content: {
          "application/json": components["schemas"]["UserSignupResponse"];
        };
      };
    };
  };
  /** @description Fetches the prices of the membership products from Stripe. */
  GetMembershipPrices: {
    responses: {
      /** @description The prices of the membership products. */
      200: {
        content: {
          "application/json": components["schemas"]["MembershipStripeProductResponse"];
        };
      };
    };
  };
  /** @description Fetches the details of a checkout session based on a stripe checkout session id. */
  GetCheckoutSessionDetails: {
    parameters: {
      query: {
        /** @description The id of the stripe checkout session to fetch. */
        sessionId: string;
      };
    };
    responses: {
      /** @description Session Fetched */
      200: {
        content: {
          "application/json": {
            metadata: components["schemas"]["stripe.Stripe.Metadata"];
            /** Format: double */
            pricePaid: number;
            customer_email: string;
            status: components["schemas"]["stripe.Stripe.Checkout.Session.Status"];
          };
        };
      };
    };
  };
  /** @description Creates a checkout session for membership payment. */
  GetMembershipPayment: {
    /** @description The request body containing the membership type. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserPaymentRequestModel"];
      };
    };
    responses: {
      /** @description Session created */
      200: {
        content: {
          "application/json": components["schemas"]["MembershipPaymentResponse"];
        };
      };
    };
  };
  /**
   * @description Creates a new booking session for the date ranges passed in,
   * will return any existing sessions if they have been started in
   * the last 30 minutes (the minimum period stripe has to persist a session for)
   */
  GetBookingPayment: {
    /** @description The request body containing the date ranges for the booking. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserBookingRequestingModel"];
      };
    };
    responses: {
      /** @description Created booking checkout session */
      200: {
        content: {
          "application/json": components["schemas"]["BookingPaymentResponse"];
        };
      };
    };
  };
  /** @description Fetches all bookings for a user based on their UID. */
  GetAllBookings: {
    responses: {
      /** @description Found bookings */
      200: {
        content: {
          "application/json": components["schemas"]["AllUserBookingSlotsResponse"];
        };
      };
    };
  };
  /** @description Fetches all available booking dates within a date range. */
  GetAvailableDates: {
    /** @description - The date range to check for available booking slots. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["AvailableDatesRequestModel"];
      };
    };
    responses: {
      /** @description Availabilities found */
      200: {
        content: {
          "application/json": components["schemas"]["AvailableDatesResponse"];
        };
      };
    };
  };
  /**
   * @description This method fetches users based on a booking date range.
   * This method requires an admin JWT token.
   */
  FetchUsersByBookingDateRange: {
    /** @description - The date range to check for user bookings. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["BookingsByDateRangeRequestModel"];
      };
    };
    responses: {
      /** @description Users found */
      200: {
        content: {
          "application/json": components["schemas"]["UsersByDateRangeResponse"];
        };
      };
    };
  };
  /** @description Booking Operations */
  MakeDateAvailable: {
    /** @description - The start and end date of the range and the number of slots to add. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["MakeDatesAvailableRequestBody"];
      };
    };
    responses: {
      /** @description Slot made available */
      201: {
        content: {
          "application/json": components["schemas"]["BookingSlotUpdateResponse"];
        };
      };
    };
  };
  /** @description Decreases availability count to 0 for all booking slots in a date range. */
  MakeDateUnavailable: {
    /** @description - The start and end date of the range, the number of slots is omitted as we're decreases all slots to 0. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["Omit_MakeDatesAvailableRequestBody.slots_"];
      };
    };
    responses: {
      /** @description Slot made unavailable */
      201: {
        content: {
          "application/json": components["schemas"]["BookingSlotUpdateResponse"];
        };
      };
    };
  };
  /** @description An admin method to create bookings for a list of users within a date range. */
  CreateBookings: {
    /** @description - The date range and list of user ids to create bookings for. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateBookingsRequestModel"];
      };
    };
    responses: {
      /** @description Bookings successfully created */
      200: {
        content: {
          "application/json": components["schemas"]["UIdssByDateRangeResponse"];
        };
      };
    };
  };
  /** @description Delete a users booking by booking ID. */
  RemoveBooking: {
    /** @description - The booking ID to delete. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["DeleteBookingRequest"];
      };
    };
    responses: {
      /** @description Booking deleted successfuly */
      200: {
        content: {
          "application/json": components["schemas"]["BookingDeleteResponse"];
        };
      };
    };
  };
  /** @description User Operations */
  GetAllUsers: {
    parameters: {
      query?: {
        /** @description - The cursor to start fetching users from. Essentially a pagination token. */
        cursor?: string;
        /** @description - The number of users to fetch. Defaults to 100. Is also a maximum of 100 users per fetch */
        toFetch?: number;
      };
    };
    responses: {
      /** @description Users found */
      200: {
        content: {
          "application/json": components["schemas"]["AllUsersResponse"];
        };
      };
    };
  };
  /**
   * @description Get a user by their UID.
   * Requires an admin JWT token.
   */
  GetUser: {
    parameters: {
      path: {
        /** @description - The UID of the user to fetch. */
        uid: string;
      };
    };
    responses: {
      /** @description User found */
      200: {
        content: {
          "application/json": components["schemas"]["GetUserResponse"];
        };
      };
    };
  };
  /**
   * @description Adds a new user to the database with their UID and user data.
   * Requires an admin JWT token.
   */
  CreateUser: {
    /** @description - The user data to create and their UID. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateUserRequestBody"];
      };
    };
    responses: {
      /** @description Created */
      200: {
        content: never;
      };
    };
  };
  /**
   * @description Edits a list of users with updated user additional info.
   * Requires an admin JWT token.
   */
  EditUsers: {
    /** @description - The list of users to edit and their updated information. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["EditUsersRequestBody"];
      };
    };
    responses: {
      /** @description Edited */
      200: {
        content: never;
      };
    };
  };
  /**
   * @description Promotes a user to a member. This returns a conflict when the user is already a member.
   * Requires an admin JWT token.
   */
  PromoteUser: {
    /** @description - The UID of the user to promote. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["PromoteUserRequestBody"];
      };
    };
    responses: {
      /** @description Promoted user */
      200: {
        content: never;
      };
    };
  };
  /**
   * @description Demotes a member to a guest. This returns a conflict when the user is already a guest.
   * Requires an admin JWT token.
   */
  DemoteUser: {
    /** @description - The UID of the user to demote. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["DemoteUserRequestBody"];
      };
    };
    responses: {
      /** @description Demoted user */
      200: {
        content: never;
      };
    };
  };
  /**
   * @description Demotes all non-admin users to guests. This is used to purge all membership statuses at the end of a billing cycle.
   * Requires an admin JWT token.
   */
  DemoteAllUsers: {
    responses: {
      /** @description Demoted all non-admin users */
      200: {
        content: never;
      };
    };
  };
  /**
   * @description Adds a coupon to a user's stripe id.
   * Requires an admin JWT token.
   */
  AddCoupon: {
    /** @description - The UID of the user to add the coupon to and the quantity of coupons to add. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["AddCouponRequestBody"];
      };
    };
    responses: {
      /** @description Coupon Added */
      200: {
        content: never;
      };
    };
  };
  /** @description Fetches the **latest** booking history events (uses cursor-based pagination) */
  GetLatestHistory: {
    /** @description - contains the pagination variables */
    requestBody: {
      content: {
        "application/json": components["schemas"]["FetchLatestBookingEventRequest"];
      };
    };
    responses: {
      /** @description History Events Fetched */
      200: {
        content: {
          "application/json": components["schemas"]["FetchLatestBookingHistoryEventResponse"];
        };
      };
    };
  };
}

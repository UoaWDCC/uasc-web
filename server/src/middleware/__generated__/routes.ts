/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './../../service-layer/controllers/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StripeWebhook } from './../../service-layer/controllers/StripeWebhook';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserSignup } from './../../service-layer/controllers/SignupController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PaymentController } from './../../service-layer/controllers/PaymentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventController } from './../../service-layer/controllers/EventController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BookingController } from './../../service-layer/controllers/BookingController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminController } from './../../service-layer/controllers/AdminController';
import { expressAuthentication } from './../../business-layer/security/Authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "FirebaseFirestore.Timestamp": {
        "dataType": "refObject",
        "properties": {
            "seconds": {"dataType":"double","required":true},
            "nanoseconds": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Partial_UserAdditionalInfo_.Exclude_keyofPartial_UserAdditionalInfo_.stripe_id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"date_of_birth":{"ref":"FirebaseFirestore.Timestamp"},"does_snowboarding":{"dataType":"boolean"},"does_racing":{"dataType":"boolean"},"does_ski":{"dataType":"boolean"},"phone_number":{"dataType":"double"},"gender":{"dataType":"string"},"emergency_contact":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},"first_name":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your First Name"}}},"last_name":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},"dietary_requirements":{"dataType":"string","validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},"ethnicity":{"dataType":"string"},"faculty":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},"university":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},"student_id":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},"university_year":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},"has_whakapapa_season_pass":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Partial_UserAdditionalInfo_.stripe_id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Partial_UserAdditionalInfo_.Exclude_keyofPartial_UserAdditionalInfo_.stripe_id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EditSelfRequestBody": {
        "dataType": "refObject",
        "properties": {
            "updatedInformation": {"ref":"Omit_Partial_UserAdditionalInfo_.stripe_id_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteUserRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignupResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "jwtToken": {"dataType":"string"},
            "uid": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserAdditionalInfo.Exclude_keyofUserAdditionalInfo.stripe_id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"date_of_birth":{"ref":"FirebaseFirestore.Timestamp","required":true},"does_snowboarding":{"dataType":"boolean"},"does_racing":{"dataType":"boolean"},"does_ski":{"dataType":"boolean"},"phone_number":{"dataType":"double","required":true},"gender":{"dataType":"string"},"emergency_contact":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},"first_name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your First Name"}}},"last_name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},"dietary_requirements":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},"ethnicity":{"dataType":"string"},"faculty":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},"university":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},"student_id":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},"university_year":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},"has_whakapapa_season_pass":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_UserAdditionalInfo.stripe_id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_UserAdditionalInfo.Exclude_keyofUserAdditionalInfo.stripe_id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignupBody": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "user": {"ref":"Omit_UserAdditionalInfo.stripe_id_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MembershipTypeValues": {
        "dataType": "refEnum",
        "enums": ["uoa_student","non_uoa_student","returning_member","new_non_student"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MembershipStripeProductResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"originalPrice":{"dataType":"string"},"displayPrice":{"dataType":"string","required":true},"discount":{"dataType":"boolean","required":true},"description":{"dataType":"string"},"name":{"ref":"MembershipTypeValues","required":true},"productId":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LodgePricingTypeValues": {
        "dataType": "refEnum",
        "enums": ["single_friday_or_saturday","normal"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LodgeStripeProductResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"originalPrice":{"dataType":"string"},"displayPrice":{"dataType":"string","required":true},"discount":{"dataType":"boolean","required":true},"description":{"dataType":"string"},"name":{"ref":"LodgePricingTypeValues","required":true},"productId":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "stripe.Stripe.Checkout.Session.Status": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["complete"]},{"dataType":"enum","enums":["expired"]},{"dataType":"enum","enums":["open"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "stripe.Stripe.Metadata": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"string"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MembershipPaymentResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "stripeClientSecret": {"dataType":"string"},
            "membershipType": {"ref":"MembershipTypeValues"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserPaymentRequestModel": {
        "dataType": "refObject",
        "properties": {
            "membershipType": {"ref":"MembershipTypeValues"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingPaymentResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "stripeClientSecret": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserBookingRequestingModel": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp"},
            "endDate": {"ref":"FirebaseFirestore.Timestamp"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Event": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "image_url": {"dataType":"string"},
            "location": {"dataType":"string"},
            "google_forms_link": {"dataType":"string"},
            "sign_up_start_date": {"ref":"FirebaseFirestore.Timestamp"},
            "sign_up_end_date": {"ref":"FirebaseFirestore.Timestamp"},
            "physical_start_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "physical_end_date": {"ref":"FirebaseFirestore.Timestamp"},
            "max_occupancy": {"dataType":"double"},
            "is_members_only": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DocumentDataWithUid_Event_": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Event"},{"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetAllEventsResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "nextCursor": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"DocumentDataWithUid_Event_"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AllUserBookingSlotsResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "dates": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableDates": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"availableSpaces":{"dataType":"double","required":true},"maxBookings":{"dataType":"double","required":true},"date":{"ref":"FirebaseFirestore.Timestamp","required":true},"description":{"dataType":"string"},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableDatesResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"AvailableDates"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableDatesRequestModel": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp"},
            "endDate": {"ref":"FirebaseFirestore.Timestamp"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAccountTypes": {
        "dataType": "refEnum",
        "enums": ["admin","member","guest"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingIdandUserData": {
        "dataType": "refObject",
        "properties": {
            "date_of_birth": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "does_snowboarding": {"dataType":"boolean"},
            "does_racing": {"dataType":"boolean"},
            "does_ski": {"dataType":"boolean"},
            "phone_number": {"dataType":"double","required":true},
            "gender": {"dataType":"string"},
            "emergency_contact": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},
            "first_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your First Name"}}},
            "last_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},
            "dietary_requirements": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},
            "ethnicity": {"dataType":"string"},
            "faculty": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},
            "university": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},
            "student_id": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},
            "university_year": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},
            "has_whakapapa_season_pass": {"dataType":"boolean"},
            "stripe_id": {"dataType":"string"},
            "uid": {"dataType":"string","required":true},
            "dateJoined": {"dataType":"string"},
            "email": {"dataType":"string","required":true},
            "membership": {"ref":"UserAccountTypes","required":true},
            "bookingId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsersByDateRangeResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"users":{"dataType":"array","array":{"dataType":"refObject","ref":"BookingIdandUserData"},"required":true},"date":{"ref":"FirebaseFirestore.Timestamp","required":true}}}},
            "error": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingsByDateRangeRequestModel": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "endDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingSlotUpdateResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "updatedBookingSlots": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"bookingSlotId":{"dataType":"string","required":true},"date":{"ref":"FirebaseFirestore.Timestamp","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MakeDatesAvailableRequestBody": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "endDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "slots": {"dataType":"double","validators":{"maximum":{"errorMsg":"You have exceeded the maximum slots for bookings","value":32},"minimum":{"errorMsg":"must be positive","value":0}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_MakeDatesAvailableRequestBody.Exclude_keyofMakeDatesAvailableRequestBody.slots__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"startDate":{"ref":"FirebaseFirestore.Timestamp","required":true},"endDate":{"ref":"FirebaseFirestore.Timestamp","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_MakeDatesAvailableRequestBody.slots_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_MakeDatesAvailableRequestBody.Exclude_keyofMakeDatesAvailableRequestBody.slots__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UIdssByDateRangeResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"users":{"dataType":"array","array":{"dataType":"string"},"required":true},"date":{"ref":"FirebaseFirestore.Timestamp","required":true}}}},
            "error": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBookingsRequestModel": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "endDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "userId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingDeleteResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "user_id": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteBookingRequest": {
        "dataType": "refObject",
        "properties": {
            "bookingID": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CombinedUserData": {
        "dataType": "refObject",
        "properties": {
            "date_of_birth": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "does_snowboarding": {"dataType":"boolean"},
            "does_racing": {"dataType":"boolean"},
            "does_ski": {"dataType":"boolean"},
            "phone_number": {"dataType":"double","required":true},
            "gender": {"dataType":"string"},
            "emergency_contact": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},
            "first_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your First Name"}}},
            "last_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},
            "dietary_requirements": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},
            "ethnicity": {"dataType":"string"},
            "faculty": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},
            "university": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},
            "student_id": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},
            "university_year": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},
            "has_whakapapa_season_pass": {"dataType":"boolean"},
            "stripe_id": {"dataType":"string"},
            "uid": {"dataType":"string","required":true},
            "dateJoined": {"dataType":"string"},
            "email": {"dataType":"string","required":true},
            "membership": {"ref":"UserAccountTypes","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AllUsersResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "nextCursor": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"CombinedUserData"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUserResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"ref":"CombinedUserData"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAdditionalInfo": {
        "dataType": "refObject",
        "properties": {
            "date_of_birth": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "does_snowboarding": {"dataType":"boolean"},
            "does_racing": {"dataType":"boolean"},
            "does_ski": {"dataType":"boolean"},
            "phone_number": {"dataType":"double","required":true},
            "gender": {"dataType":"string"},
            "emergency_contact": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},
            "first_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your First Name"}}},
            "last_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},
            "dietary_requirements": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},
            "ethnicity": {"dataType":"string"},
            "faculty": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},
            "university": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},
            "student_id": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},
            "university_year": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},
            "has_whakapapa_season_pass": {"dataType":"boolean"},
            "stripe_id": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
            "user": {"ref":"UserAdditionalInfo","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_UserAdditionalInfo_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"date_of_birth":{"ref":"FirebaseFirestore.Timestamp"},"does_snowboarding":{"dataType":"boolean"},"does_racing":{"dataType":"boolean"},"does_ski":{"dataType":"boolean"},"phone_number":{"dataType":"double"},"gender":{"dataType":"string"},"emergency_contact":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},"first_name":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your First Name"}}},"last_name":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},"dietary_requirements":{"dataType":"string","validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},"ethnicity":{"dataType":"string"},"faculty":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},"university":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},"student_id":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},"university_year":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},"has_whakapapa_season_pass":{"dataType":"boolean"},"stripe_id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EditUsersRequestBody": {
        "dataType": "refObject",
        "properties": {
            "users": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"updatedInformation":{"ref":"Partial_UserAdditionalInfo_","required":true},"uid":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PromoteUserRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DemoteUserRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddCouponRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingAddedEvent": {
        "dataType": "refObject",
        "properties": {
            "timestamp": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "start_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "end_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "event_type": {"dataType":"enum","enums":["added_user_to_booking"],"required":true},
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingDeletedEvent": {
        "dataType": "refObject",
        "properties": {
            "timestamp": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "start_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "end_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "event_type": {"dataType":"enum","enums":["removed_user_from_booking"],"required":true},
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingAvailabilityChangeEvent": {
        "dataType": "refObject",
        "properties": {
            "timestamp": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "start_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "end_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "event_type": {"dataType":"enum","enums":["changed_date_availability"],"required":true},
            "change": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingHistoryEvent": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"BookingAddedEvent"},{"ref":"BookingDeletedEvent"},{"ref":"BookingAvailabilityChangeEvent"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FetchLatestBookingHistoryEventResponse": {
        "dataType": "refObject",
        "properties": {
            "nextCursor": {"dataType":"string"},
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "historyEvents": {"dataType":"array","array":{"dataType":"refAlias","ref":"BookingHistoryEvent"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateEventBody": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"Event","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Event_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"description":{"dataType":"string"},"image_url":{"dataType":"string"},"location":{"dataType":"string"},"google_forms_link":{"dataType":"string"},"sign_up_start_date":{"ref":"FirebaseFirestore.Timestamp"},"sign_up_end_date":{"ref":"FirebaseFirestore.Timestamp"},"physical_start_date":{"ref":"FirebaseFirestore.Timestamp"},"physical_end_date":{"ref":"FirebaseFirestore.Timestamp"},"max_occupancy":{"dataType":"double"},"is_members_only":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetEventResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"ref":"Event"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MailConfig": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string"},
            "password": {"dataType":"string"},
            "fromHeader": {"dataType":"string","default":"UASC Bookings"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetMailConfigResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "config": {"ref":"MailConfig"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateMailConfigResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_MailConfig_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"email":{"dataType":"string"},"password":{"dataType":"string"},"fromHeader":{"dataType":"string","default":"UASC Bookings"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateMailConfigRequestBody": {
        "dataType": "refObject",
        "properties": {
            "config": {"ref":"Partial_MailConfig_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EmailTemplate": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetAllEmailTemplatesResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "templates": {"dataType":"array","array":{"dataType":"refObject","ref":"EmailTemplate"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetEmailTemplateResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "template": {"ref":"EmailTemplate"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateEmailTemplateResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateEmailTemplateRequestBody": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUsersController_getSelf: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/users/self',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.getSelf)),

            async function UsersController_getSelf(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_getSelf, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'getSelf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_editSelf: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"EditSelfRequestBody"},
        };
        app.patch('/users/edit-self',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.editSelf)),

            async function UsersController_editSelf(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_editSelf, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'editSelf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsersController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DeleteUserRequestBody"},
        };
        app.delete('/users/delete-user',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.deleteUser)),

            async function UsersController_deleteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsersController_deleteUser, request, response });

                const controller = new UsersController();

              await templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStripeWebhook_receiveWebhook: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.post('/webhook',
            ...(fetchMiddlewares<RequestHandler>(StripeWebhook)),
            ...(fetchMiddlewares<RequestHandler>(StripeWebhook.prototype.receiveWebhook)),

            async function StripeWebhook_receiveWebhook(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStripeWebhook_receiveWebhook, request, response });

                const controller = new StripeWebhook();

              await templateService.apiHandler({
                methodName: 'receiveWebhook',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserSignup_signup: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserSignupBody"},
        };
        app.post('/signup',
            ...(fetchMiddlewares<RequestHandler>(UserSignup)),
            ...(fetchMiddlewares<RequestHandler>(UserSignup.prototype.signup)),

            async function UserSignup_signup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserSignup_signup, request, response });

                const controller = new UserSignup();

              await templateService.apiHandler({
                methodName: 'signup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentController_getMembershipPrices: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/payment/membership_prices',
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getMembershipPrices)),

            async function PaymentController_getMembershipPrices(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_getMembershipPrices, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'getMembershipPrices',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentController_getLodgePrices: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/payment/lodge_prices',
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getLodgePrices)),

            async function PaymentController_getLodgePrices(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_getLodgePrices, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'getLodgePrices',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentController_getCheckoutSessionDetails: Record<string, TsoaRoute.ParameterSchema> = {
                sessionId: {"in":"query","name":"sessionId","required":true,"dataType":"string"},
        };
        app.get('/payment/checkout_status',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getCheckoutSessionDetails)),

            async function PaymentController_getCheckoutSessionDetails(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_getCheckoutSessionDetails, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'getCheckoutSessionDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentController_getMembershipPayment: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserPaymentRequestModel"},
        };
        app.post('/payment/membership',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getMembershipPayment)),

            async function PaymentController_getMembershipPayment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_getMembershipPayment, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'getMembershipPayment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPaymentController_getBookingPayment: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserBookingRequestingModel"},
        };
        app.post('/payment/booking',
            authenticateMiddleware([{"jwt":["member"]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getBookingPayment)),

            async function PaymentController_getBookingPayment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPaymentController_getBookingPayment, request, response });

                const controller = new PaymentController();

              await templateService.apiHandler({
                methodName: 'getBookingPayment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_getAllEvents: Record<string, TsoaRoute.ParameterSchema> = {
                limit: {"default":20,"in":"query","name":"limit","dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"string"},
        };
        app.get('/events',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getAllEvents)),

            async function EventController_getAllEvents(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_getAllEvents, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'getAllEvents',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEventController_getAllEventsAsMember: Record<string, TsoaRoute.ParameterSchema> = {
                limit: {"default":20,"in":"query","name":"limit","dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"string"},
        };
        app.get('/events/for-members',
            authenticateMiddleware([{"jwt":["member"]}]),
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getAllEventsAsMember)),

            async function EventController_getAllEventsAsMember(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEventController_getAllEventsAsMember, request, response });

                const controller = new EventController();

              await templateService.apiHandler({
                methodName: 'getAllEventsAsMember',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBookingController_getAllBookings: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"request","name":"request","required":true,"dataType":"object"},
        };
        app.get('/bookings',
            authenticateMiddleware([{"jwt":["member"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookingController)),
            ...(fetchMiddlewares<RequestHandler>(BookingController.prototype.getAllBookings)),

            async function BookingController_getAllBookings(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBookingController_getAllBookings, request, response });

                const controller = new BookingController();

              await templateService.apiHandler({
                methodName: 'getAllBookings',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBookingController_getAvailableDates: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AvailableDatesRequestModel"},
        };
        app.post('/bookings/available-dates',
            authenticateMiddleware([{"jwt":["member"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookingController)),
            ...(fetchMiddlewares<RequestHandler>(BookingController.prototype.getAvailableDates)),

            async function BookingController_getAvailableDates(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBookingController_getAvailableDates, request, response });

                const controller = new BookingController();

              await templateService.apiHandler({
                methodName: 'getAvailableDates',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBookingController_fetchUsersByBookingDateRange: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"BookingsByDateRangeRequestModel"},
        };
        app.post('/bookings/fetch-users',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookingController)),
            ...(fetchMiddlewares<RequestHandler>(BookingController.prototype.fetchUsersByBookingDateRange)),

            async function BookingController_fetchUsersByBookingDateRange(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBookingController_fetchUsersByBookingDateRange, request, response });

                const controller = new BookingController();

              await templateService.apiHandler({
                methodName: 'fetchUsersByBookingDateRange',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_makeDateAvailable: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"MakeDatesAvailableRequestBody"},
        };
        app.post('/admin/bookings/make-dates-available',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.makeDateAvailable)),

            async function AdminController_makeDateAvailable(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_makeDateAvailable, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'makeDateAvailable',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_makeDateUnavailable: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Omit_MakeDatesAvailableRequestBody.slots_"},
        };
        app.post('/admin/bookings/make-dates-unavailable',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.makeDateUnavailable)),

            async function AdminController_makeDateUnavailable(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_makeDateUnavailable, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'makeDateUnavailable',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_createBookings: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateBookingsRequestModel"},
        };
        app.post('/admin/bookings/create',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createBookings)),

            async function AdminController_createBookings(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_createBookings, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'createBookings',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_removeBooking: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DeleteBookingRequest"},
        };
        app.post('/admin/bookings/delete',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.removeBooking)),

            async function AdminController_removeBooking(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_removeBooking, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'removeBooking',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getAllUsers: Record<string, TsoaRoute.ParameterSchema> = {
                cursor: {"in":"query","name":"cursor","dataType":"string"},
                toFetch: {"in":"query","name":"toFetch","dataType":"double"},
        };
        app.get('/admin/users',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getAllUsers)),

            async function AdminController_getAllUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getAllUsers, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getUser: Record<string, TsoaRoute.ParameterSchema> = {
                uid: {"in":"path","name":"uid","required":true,"dataType":"string"},
        };
        app.get('/admin/users/:uid',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getUser)),

            async function AdminController_getUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getUser, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateUserRequestBody"},
        };
        app.put('/admin/users/create',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createUser)),

            async function AdminController_createUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_createUser, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_editUsers: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"EditUsersRequestBody"},
        };
        app.patch('/admin/users/bulk-edit',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.editUsers)),

            async function AdminController_editUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_editUsers, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'editUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_promoteUser: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"PromoteUserRequestBody"},
        };
        app.put('/admin/users/promote',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.promoteUser)),

            async function AdminController_promoteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_promoteUser, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'promoteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_demoteUser: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DemoteUserRequestBody"},
        };
        app.put('/admin/users/demote',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.demoteUser)),

            async function AdminController_demoteUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_demoteUser, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'demoteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_demoteAllUsers: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.patch('/admin/users/demote-all',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.demoteAllUsers)),

            async function AdminController_demoteAllUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_demoteAllUsers, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'demoteAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_addCoupon: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AddCouponRequestBody"},
        };
        app.post('/admin/users/add-coupon',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.addCoupon)),

            async function AdminController_addCoupon(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_addCoupon, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'addCoupon',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getLatestHistory: Record<string, TsoaRoute.ParameterSchema> = {
                limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
                cursor: {"in":"query","name":"cursor","dataType":"string"},
        };
        app.get('/admin/bookings/history',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getLatestHistory)),

            async function AdminController_getLatestHistory(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getLatestHistory, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getLatestHistory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_createNewEvent: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"CreateEventBody"},
        };
        app.post('/admin/events',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createNewEvent)),

            async function AdminController_createNewEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_createNewEvent, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'createNewEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_editEvent: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Partial_Event_"},
        };
        app.patch('/admin/events/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.editEvent)),

            async function AdminController_editEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_editEvent, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'editEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_deleteEvent: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/admin/events/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.deleteEvent)),

            async function AdminController_deleteEvent(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_deleteEvent, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'deleteEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getEventById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/admin/events/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getEventById)),

            async function AdminController_getEventById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getEventById, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getEventById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getEnvUrl: Record<string, TsoaRoute.ParameterSchema> = {
                redirectKey: {"in":"path","name":"redirectKey","required":true,"dataType":"string"},
        };
        app.get('/admin/redirect/:redirectKey',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getEnvUrl)),

            async function AdminController_getEnvUrl(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getEnvUrl, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getEnvUrl',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getMailConfig: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/admin/mail/config',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getMailConfig)),

            async function AdminController_getMailConfig(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getMailConfig, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getMailConfig',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_updateMailConfig: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateMailConfigRequestBody"},
        };
        app.put('/admin/mail/config',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.updateMailConfig)),

            async function AdminController_updateMailConfig(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_updateMailConfig, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'updateMailConfig',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getAllEmailTemplates: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/admin/mail/templates',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getAllEmailTemplates)),

            async function AdminController_getAllEmailTemplates(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getAllEmailTemplates, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getAllEmailTemplates',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_getEmailTemplate: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/admin/mail/templates/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getEmailTemplate)),

            async function AdminController_getEmailTemplate(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_getEmailTemplate, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'getEmailTemplate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAdminController_updateEmailTemplate: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UpdateEmailTemplateRequestBody"},
        };
        app.put('/admin/mail/templates',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.updateEmailTemplate)),

            async function AdminController_updateEmailTemplate(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAdminController_updateEmailTemplate, request, response });

                const controller = new AdminController();

              await templateService.apiHandler({
                methodName: 'updateEmailTemplate',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

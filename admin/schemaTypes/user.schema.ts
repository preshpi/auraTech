export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'uid',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'firstname',
      title: 'First Name',
      type: 'string',
    },
    {
      name: 'lastname',
      title: 'Last Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'boolean',
    },
    {
      name: 'isGoogle',
      title: 'Signed up with Google',
      type: 'boolean',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'zipCode',
      title: 'Zip Code',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'url',
    },
  ],
}

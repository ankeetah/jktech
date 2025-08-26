import { test, request } from '@playwright/test';

test('Get Books', async () => {
  const apiContext = await request.newContext({
    baseURL: 'http://127.0.0.1:8000',
    extraHTTPHeaders: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmtpdGFnb25kYW5lMUBnbWFpbC5jb20iLCJleHAiOjE3NTYyMDkzMTl9.cDvRcJ8Dx_VdQOTy9RkH9VZlq4cjxeu2zRlb3mS3A10',
    },
  });

  // Use the context to send a POST request
  const response = await apiContext.get('/books', {
    data: {
      id: 0,
      email: 'ankitagondane1@gmail.com',
      password: 'coco123',
    },
  });

  console.log(await response.json());
});
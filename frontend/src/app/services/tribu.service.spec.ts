import { TestBed } from '@angular/core/testing';
import axios from 'axios';
import { TribuService } from './tribu.service';
import { jest } from '@jest/globals';

describe('TribuService', () => {
  let service: TribuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TribuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from API', async () => {
    // Mock axios.get to return a resolved promise with mock data
    const mockData = [{ id: '1', name: 'Product 1', description: 'Description 1' }];
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData });

    const data = await service.getDatos();

    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(service.apiUrl, { headers: { authorid: '2' } });
  });

  it('should verify ID from API', async () => {
    const id = '123';
    const mockVerificationData = { id: '123', verified: true };
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockVerificationData });

    const verificationData = await service.verificationId(id);

    expect(verificationData).toEqual(mockVerificationData);
    expect(axios.get).toHaveBeenCalledWith(`${service.apiUrlVerif}?id=${id}`);
  });

  it('should post data to API', async () => {
    const testData = { id: '123', name: 'Product 1', description: 'Description 1', logo:'logo',date_release:'01-01-2021',date_revision:'01-01-2021' };
    const mockResponseData = { id: '123', success: true };
    jest.spyOn(service, 'verificationId').mockResolvedValueOnce(false);
    jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: mockResponseData });

    const responseData = await service.postDatos(testData);

    expect(responseData).toEqual(mockResponseData);
    expect(axios.post).toHaveBeenCalledWith(service.apiUrl, testData, { headers: { authorid: '2' } });
  });

  it('should delete data from API', async () => {
    const id = '123';
    const mockResponseData = { success: true };
    jest.spyOn(axios, 'delete').mockResolvedValueOnce({ data: mockResponseData });

    const responseData = await service.deleteDatos(id);

    expect(responseData).toEqual(mockResponseData);
    expect(axios.delete).toHaveBeenCalledWith(`${service.apiUrl}?id=${id}`, { headers: { authorid: '2' } });
  });

  it('should update data in API', async () => {
    const testData = { id: '123', name: 'Product 1', description: 'Description 1', logo:'logo',date_release:'01-01-2021',date_revision:'01-01-2021' };    const mockResponseData = { id: '123', success: true };
    jest.spyOn(axios, 'put').mockResolvedValueOnce({ data: mockResponseData });

    const responseData = await service.updateDatos(testData);

    expect(responseData).toEqual(mockResponseData);
    expect(axios.put).toHaveBeenCalledWith(`${service.apiUrl}?id=${testData.id}`, testData, { headers: { authorid: '2' } });
  });

  it('should generate a random author ID', () => {
    const authorId = service.generateAuthorId();
    expect(authorId).toBeGreaterThanOrEqual(1);
    expect(authorId).toBeLessThanOrEqual(500);
  });
});

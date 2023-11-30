import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';
import CurrencyTable from '../CurrencyTable';

jest.mock('swr', () => jest.requireActual('swr'));

describe('CurrencyTable', () => {
    test('should update input values in editable cells', async () => {
        render(<CurrencyTable />);

        await waitFor(() => screen.getByText(/Loading/i), { timeout: 3000 });

        const editableCells = screen.getAllByTestId((id) => id.startsWith('editable-cell') && id.includes('-buy'));


        editableCells.forEach((editableCell) => {
            fireEvent.mouseEnter(editableCell);

            const inputElement = within(editableCell).getByRole('textbox');

            fireEvent.change(inputElement, { target: { value: '50' } });

            expect(inputElement.value).toBe('50');
        });

    });
});

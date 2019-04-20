/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectRow,
} from '..';
import { initialRows, headers } from './shared';

export default () => (
  <DataTable
    rows={initialRows}
    headers={headers}
    radio
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With radio button selection">
        <Table sortable={true}>
          <TableHead>
            <TableRow>
              <th scope="col" />
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow {...getRowProps({ row })}>
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);

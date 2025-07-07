import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TablePagination } from "../table/table-pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { InfoIcon } from "lucide-react";
import type { JsonType, MetaData } from "@/types";

type AppTableProps = {
  headers: JsonType;
  data: object[];
  actionHeader?: string;
  actions?: (row: JsonType) => React.ReactNode;
  metadata?: MetaData;
  onMetadataChange?: (metadata: MetaData) => void;
  headersInfo?: JsonType;
  customRenderers?: Record<
    string,
    (value: string | number, row?: JsonType) => React.ReactNode
  >;
  removeAllRowsPerPage?: boolean;
};

export default function AppTable({
  headers,
  data,
  actions,
  actionHeader = "Action",
  metadata,
  onMetadataChange,
  headersInfo,
  customRenderers,
  removeAllRowsPerPage = false,
}: AppTableProps) {
  const keys = Object.keys(headers);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(headers).map((key, index) => (
              <TableHead key={index}>
                <>
                  <div className="flex items-center">
                    <div>{headers[key] as React.ReactNode}</div>
                    <div>
                      {headersInfo &&
                        (headersInfo[key] as React.ReactNode) &&
                        ((
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <InfoIcon className="ml-1 h-4 w-4 cursor-help text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{headersInfo[key] as React.ReactNode}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) as React.ReactNode)}
                    </div>
                  </div>
                </>
              </TableHead>
            ))}
            {actions && <TableHead>{actionHeader}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={keys.length + 1} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow className="cursor-pointer" key={index}>
                {keys.map((key, index) => {
                  // Check if we have a custom renderer for this column
                  if (customRenderers && customRenderers[key]) {
                    return (
                      <TableCell key={index}>
                        {customRenderers[key](
                          row[key as keyof typeof row],
                          row as JsonType
                        )}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={index}>
                      {row[key as keyof typeof row] as string}
                    </TableCell>
                  );
                })}
                {actions && <TableCell>{actions(row as JsonType)}</TableCell>}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {metadata && metadata.total > 0 && (
        <TablePagination
          metadata={metadata}
          onMetadataChange={(metadata) =>
            onMetadataChange && onMetadataChange(metadata)
          }
          removeAllRowsPerPage={removeAllRowsPerPage}
        />
      )}
    </div>
  );
}

import { Box, Center, CenterProps, Input } from "@chakra-ui/react";
import { ReactNode } from "react";

export type FileUploadProps = {
  accept?: string;
  buttonProps?: CenterProps;
  render?: ReactNode;
  maxSize?: number;
  onUploadFile: (props: UploadFileCallbackProps) => void;
};

export type UploadFileCallbackProps = {
  success: boolean;
  src: FileReader["result"];
  file: File;
  error: string | null;
};

export default function FileUpload({
  accept = "image/*, .pdf",
  maxSize = 10,
  buttonProps,
  render,
  onUploadFile,
}: FileUploadProps) {
  const RenderContent = render || "Upload";
  const validateFile = (file: File) => {
    const maxSizeInMb = maxSize * 1024 * 1024;
    if (file.size > maxSizeInMb) {
      return {
        success: false,
        reason: `Exceeded Max File Size (${maxSize} Mb)`,
      };
    }

    return {
      success: true,
      reason: null,
    };
  };

  return (
    <Box>
      <Input
        data-testid="file_upload-image"
        type="file"
        id="upload-image"
        accept={accept}
        onChange={(e) => {
          e.preventDefault();
          const file = e.target?.files?.[0];

          if (file) {
            const { success, reason } = validateFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
              onUploadFile({
                success,
                error: reason,
                file,
                src: e.target?.result || null,
              });
            };
          }
        }}
        hidden
      />
      <Center
        as="label"
        data-testid="txt_upload-image"
        htmlFor="upload-image"
        cursor="pointer"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="4px"
        p="4px"
        transition="all ease 0.3s"
        _hover={{ bg: "brand.50" }}
        {...buttonProps}
      >
        {RenderContent}
      </Center>
    </Box>
  );
}

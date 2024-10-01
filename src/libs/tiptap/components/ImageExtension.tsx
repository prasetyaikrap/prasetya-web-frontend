import { Image, Text, Textarea, VStack } from "@chakra-ui/react";
import {
  mergeAttributes,
  Node,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { useRef } from "react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       * @param options The image attributes
       * @example
       * editor
       *   .commands
       *   .setImage({ src: 'https://tiptap.dev/logo.png', alt: 'tiptap', title: 'tiptap logo' })
       */
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        objectFit?: string;
        caption?: string;
      }) => ReturnType;
    };
  }
}

export const ChakraImage = Node.create({
  name: "chakraImage",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: "",
      },
      alt: {
        default: "",
      },
      title: {
        default: "",
      },
      objectFit: {
        default: "cover",
      },
      caption: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "chakra-image",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["chakra-image", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});

function ImageComponent(props: NodeViewProps) {
  const { isEditable } = props.editor;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  const handleChange = (event: any) => {
    props.updateAttributes({
      ...props.node.attrs,
      caption: event.target.value,
    });
    handleInput();
  };

  return (
    <NodeViewWrapper>
      <VStack
        className="chakraImage"
        as="figure"
        justifyContent="center"
        marginY="24px"
      >
        <Image
          src={props.node.attrs.src}
          alt={props.node.attrs.alt}
          width={{ base: "90%", md: "80%", xl: "75%" }}
          objectFit={props.node.attrs.objectFit}
          boxShadow="base"
          cursor="grab"
          _focus={{ borderWidth: "1px", borderColor: "red.500" }}
        />
        {isEditable && (
          <Textarea
            ref={textareaRef}
            placeholder="write caption"
            textAlign="center"
            size="xs"
            fontSize="12px"
            color="monochrome.600"
            width="60%"
            border="none"
            resize="none"
            rows={1}
            maxLength={500}
            value={props.node.attrs.caption}
            onChange={handleChange}
          />
        )}
        {!isEditable && (
          <Text
            as="figcaption"
            textAlign="center"
            fontSize="12px"
            color="monochrome.600"
            width="60%"
          >
            {props.node.attrs.caption}
          </Text>
        )}
      </VStack>
    </NodeViewWrapper>
  );
}

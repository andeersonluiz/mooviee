import { useEffect, useState } from 'react';
import { Dialog, Modal } from 'react-aria-components';

const DialogTrailer = ({
  isOpen,
  onClose,
  keyVideo,
}: {
  isOpen: boolean;
  onClose: () => void;
  keyVideo: string;
}) => {
  const url = `https://www.youtube.com/embed/${keyVideo}`;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    return () => {
      setIsLoading(true);
    };
  }, [isOpen]);
  return (
    <Modal className={``} isOpen={isOpen}>
      <Dialog>
        {(props) => {
          return (
            <>
              <div
                onClick={async () => {
                  setIsLoading(true);
                  await new Promise((r) =>
                    setTimeout(r, 300)
                  );
                  onClose();
                }}
                className={`fixed left-[50%] top-[50%] h-full w-full -translate-x-1/2 -translate-y-1/2 bg-black opacity-60`}
              ></div>
              <iframe
                width='720'
                height='405'
                className={`${isLoading ? 'opacity-0' : 'opacity-100'} fixed left-[50%] top-[50%] aspect-video -translate-x-1/2 -translate-y-1/2 self-stretch transition-opacity duration-300 md:min-h-96`}
                src={url}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                onLoad={() => {
                  return setIsLoading(false);
                }}
                allowFullScreen
              ></iframe>
            </>
          );
        }}
      </Dialog>
    </Modal>
  );
};

export default DialogTrailer;

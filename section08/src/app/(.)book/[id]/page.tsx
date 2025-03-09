import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

export default function Page(props: any) {
  return (
    <div>
      Intercepting Route
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}

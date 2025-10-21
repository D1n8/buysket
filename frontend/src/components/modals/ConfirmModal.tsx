interface IConfirmModal {
    question: string,
    isOpen: boolean,
    handleSubmit: (e: React.FormEvent) => void,
    onClose: () => void
}

function ConfirmModal({ question, isOpen, handleSubmit, onClose }: IConfirmModal) {
    return (
        <>
            {
                isOpen && (
                    <div className="backdrop">
                        <div className="modal">
                            <button className="close" onClick={onClose}>Закрыть</button>
                            <div className="modal-contanier">
                                <p className="modal-question">{question}</p>
                                <div className="btns-container">
                                    <button className="agree" onClick={(e) => handleSubmit(e)}>Да</button>
                                    <button className="cansel" onClick={onClose}>Отмена</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default ConfirmModal;
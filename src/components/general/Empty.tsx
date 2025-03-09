type Props = {
  title: string;
  subTitle: string;
  titleStyle?: string;
  subTitleStyle?: string;
  imgUrl?: string;
};

const Empty = ({
  title,
  imgUrl,
  titleStyle,
  subTitle,
  subTitleStyle,
}: Props) => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      {imgUrl && (
        <div className="w-[200px] h-[200px] overflow-hidden grayscale">
          <img src={imgUrl} alt="empty cart image" width={1000} height={1000} />
        </div>
      )}

      <p className={`capitalize font-bold text-2xl text-black ${titleStyle}`}>
        {title}
      </p>
      <p
        className={`text-sm mt-2 text-gray-400 text-wrap text-center max-w-[350px] ${subTitleStyle}`}
      >
        {subTitle}
      </p>
    </div>
  );
};

export default Empty;

"use client";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function TestForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [imageURLs, setImageURLs] = useState([]);

  const getAzData = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      console.log("AIサポート開始！");
      // 初期化
      setValue("title", "");
      setValue("detail", "");
      setImageURLs([]);

      // postする値はmessageという変数で統一する。keyword以外にも複数の項目を用意する場合は、23行目でそれらを結合すれば1つのmessageにできる。
      const message = keyword;
      const kotowazaTextRes = await axios.post("api/azopenaichat", { message });
      console.log("kotowazaTextRes");
      console.log(kotowazaTextRes);
      console.log("content/fixed")
      const content_fixed = kotowazaTextRes.data[0].message.content.replace('```','').replace('json','').replace('```','')
      console.log(content_fixed)
      const { title, detail, englishDetail } = JSON.parse(
        //kotowazaTextRes.data[0].message.content
        content_fixed
      );
      console.log("title: " + title)
      console.log("detail: " + detail)
      console.log("englishDetail: " + englishDetail)

      setValue("title", title);
      setValue("detail", detail);

      const kotowazaImageRes = await axios.post("api/azopenaidalle", {
        message: englishDetail,
      });
      console.log(kotowazaImageRes);
      if (kotowazaImageRes.data && kotowazaImageRes.data.data) {
        setImageURLs(kotowazaImageRes.data.data);
      }
    } catch (error) {
      console.log("フォーム入力エラー", error);
    }

    // ローディングとモーダルの初期化
    setIsLoading(false);
    setShowModal(false);
  };

  // const handleOnSubmit: SubmitHandler<ProductType> = (data) => {
  //   console.log(data);
  //   reset();
  // };

  const {
    register,
    // handleSubmit,
    // reset,
    setValue,
    formState: { errors: formatError, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <>
      <button
        className="fixed z-50 top-100 right-20 py-5 px-2 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 normal-case"
        onClick={() => setShowModal(true)}
      >
        💡 Azure OpenAI Serviceに相談
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    🤖キーワードカラコトワザヲツクッテミマス
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  <>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      ナニカキーワードヲニュウリョクシテクダサイ
                    </label>
                    <textarea
                      id="message"
                      onChange={(e) => setKeyword(e.target.value)}
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="例）台風、居酒屋..."
                    ></textarea>
                  </>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    閉じる
                  </button>
                  {isLoading ? (
                    <button
                      className="bg-gray-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      disabled
                    >
                      AIサポート実行中
                    </button>
                  ) : (
                    <button
                      className="bg-emerald-500 text-white bg-pink-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={getAzData}
                    >
                      AIサポート実行！
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <form
        // method="post"
        // onSubmit={(event) => {
        //   void handleSubmit(handleOnSubmit)(event);
        // }}
        className="flex flex-col space-y-10 bg-white p-10 rounded-lg shadow-lg"
      >
        <h1 className="flex text-xl">簡単なフォーム画面</h1>
        <div className="flex mb-6">
          <div className="w-1/4">
            <label className="block text-gray-900 font-bold text-left mb-1 pl-4 mr-2">
              架空のことわざ
            </label>
          </div>
          <div className="w-3/4">
            <input
              className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              {...register("title")}
              placeholder="架空のことわざを記載"
            />
          </div>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="flex mb-6">
          <div className="w-1/4">
            <label className="block text-gray-900 font-bold text-left mb-1 pl-4 mr-2">
              架空のことわざの意味
            </label>
          </div>
          <div className="w-3/4">
            <textarea
              {...register("detail")}
              className="h-48 bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="架空のことわざの意味を記載"
            ></textarea>
          </div>
        </div>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="flex mb-6">
          <div className="w-1/4">
            <label className="block text-gray-900 font-bold text-left mb-1 pl-4 mr-2">
              架空のことわざを表す画像
            </label>
          </div>
          <div className="w-3/4">
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
            {imageURLs.length > 0 && (
              <div className="flex">
                {imageURLs.map((item: any, index: number) => (
                  <div className="mr-2" key={index}>
                    <img src={item.url} alt={`generated image ${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ボタンの見栄えだけ実装（登録機能はありません） */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="bg-slate-800 hover:bg-slate-600 rounded px-4 py-2 text-white  disabled:bg-gray-300 md:self-center"
        >
          登録する(未実装)
        </button>
      </form>
    </>
  );
}

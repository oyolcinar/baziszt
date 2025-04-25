import Image from 'next/image';

const BUCKET_URL = 'https://baziszt.nuglobucket.org/public/MoodboardImages';

const moodboardImages = {
  MI01: `${BUCKET_URL}/00D6CFF6-3662-4DD8-AF2F-FF2799E7D1D8_1_105_c.jpeg`,
  MI02: `${BUCKET_URL}/0F58090C-9F98-47B2-AF0F-7BF04572015C_1_105_c.jpeg`,
  MI03: `${BUCKET_URL}/16368BCC-C64C-4CB8-B43D-B542D6F19567_1_105_c.jpeg`,
  MI04: `${BUCKET_URL}/18026F23-087C-4B2C-BFFD-C5FA6A752362_1_105_c.jpeg`,
  MI05: `${BUCKET_URL}/18027B0A-FDCD-401E-BCBD-A7D54AEEA0E9_1_105_c.jpeg`,
  MI06: `${BUCKET_URL}/3e9851b024e9df9754c15ab620f0e7f5.jpg`,
  MI07: `${BUCKET_URL}/402923C7-5505-4D90-A14F-F3D367A4B4FE_1_105_c.jpeg`,
  MI08: `${BUCKET_URL}/41d4c635e3d0622ee829b2d07b61675a.jpg`,
  MI09: `${BUCKET_URL}/423DA06A-D758-4414-90E2-CAFF2ED9816A_1_105_c.jpeg`,
  MI10: `${BUCKET_URL}/43C8C42C-58CE-47AB-A3B7-39933FC1AFDA_1_105_c.jpeg`,
  MI11: `${BUCKET_URL}/4697301A-8256-40E0-B24A-55EF8E010B33_1_105_c.jpeg`,
  MI12: `${BUCKET_URL}/4D3F79B0-48CA-43F3-A63D-3C1D8E90EAF1_1_105_c.jpeg`,
  MI13: `${BUCKET_URL}/56f117c778b7dd423632e2b019174984.jpg`,
  MI14: `${BUCKET_URL}/60400A1F-4326-45B0-822A-81286E44DDEA_1_105_c.jpeg`,
  MI15: `${BUCKET_URL}/69E0A317-8FA2-4620-9474-10E0A9632578_1_105_c.jpeg`,
  MI16: `${BUCKET_URL}/6BD6AF86-4C60-4941-99C3-D5DA5B5ED3D6_1_105_c.jpeg`,
  MI17: `${BUCKET_URL}/6D25B10A-CD9E-408D-8684-4FE5C897F878_1_105_c.jpeg`,
  MI18: `${BUCKET_URL}/6f1e94a9abcddee23bfb705e44538b71.jpg`,
  MI19: `${BUCKET_URL}/7A134A11-73F4-4312-B5B5-0440BF2D8EA6_1_105_c.jpeg`,
  MI20: `${BUCKET_URL}/9321B5A5-9749-40D8-98F7-D9726B3E35F4_1_105_c.jpeg`,
  MI21: `${BUCKET_URL}/952f86258833113edd040fc397244607.jpg`,
  MI22: `${BUCKET_URL}/9594F7A9-8235-4F86-AC1C-3B772EC8EE30_1_105_c.jpeg`,
  MI23: `${BUCKET_URL}/98B030DB-EC39-4139-99C5-4B7A0E1AFD4D_1_105_c.jpeg`,
  MI24: `${BUCKET_URL}/99CA820A-1C29-4322-8D54-E0A42D47E250_1_105_c.jpeg`,
  MI25: `${BUCKET_URL}/9F6CF50A-5DAA-4044-9CA2-83C1DB520232_1_105_c.jpeg`,
  MI26: `${BUCKET_URL}/A25E506D-E3A7-44ED-80E3-5037E1F9D891_1_105_c.jpeg`,
  MI27: `${BUCKET_URL}/A29C5CAD-289A-4B5F-821D-723127CB61FA_1_105_c.jpeg`,
  MI28: `${BUCKET_URL}/ABB4BE6A-D2E7-4BE6-9722-C6481CC8A133_1_105_c.jpeg`,
  MI29: `${BUCKET_URL}/ABCACF13-A352-4B52-A8D7-B4C2D2E96967_1_105_c.jpeg`,
  MI30: `${BUCKET_URL}/C46D60EC-FB3B-403F-A463-8FD71F121F73_1_105_c.jpeg`,
  MI31: `${BUCKET_URL}/D10C1308-C814-40EB-A29A-6F8BE53C347B_1_105_c.jpeg`,
  MI32: `${BUCKET_URL}/D5C486A2-E2B6-4E4F-B88A-D5CE96CCB803_1_105_c.jpeg`,
  MI33: `${BUCKET_URL}/DD565A34-5AC0-44FB-AB7B-64C34334F955_1_105_c.jpeg`,
  MI34: `${BUCKET_URL}/DFF1D278-C588-44AC-AC46-F55150A6427C_1_105_c.jpeg`,
  MI35: `${BUCKET_URL}/E6CCF55D-70DF-483A-8FCA-2AD7AA13DF99_1_105_c.jpeg`,
  MI36: `${BUCKET_URL}/F2BF7EBD-290D-4C0C-B2F5-8540621B3278_1_105_c.jpeg`,
  MI37: `${BUCKET_URL}/F4761361-4368-425C-9A24-A8DE7DC60B0E_1_105_c.jpeg`,
  MI38: `${BUCKET_URL}/FE12CDC5-BFE8-44A4-AF9D-69C1224DBBA3_1_105_c.jpeg`,
  MI39: `${BUCKET_URL}/baa2bbd6ab66e6965ad5d25d840ace4b.jpg`,
  MI40: `${BUCKET_URL}/e70954af7be2282eb4f22808703cf25e.jpg`,
};

export default function Journal() {
  return (
    <main className='flex justify-center items-center font-altesse24 text-bordeux mt-[160px] m-12 text-xl'>
      <div className='w-[300px] md:w-full leading-[50px] md:leading-[200px]'>
        <span className='text-6xl md:text-6xl md:text-8xl'>Lorem</span>, ipsum
        dolor sit amet consectetur adipisicing elit.
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI01} />
        </span>
        Minus deserunt iste{' '}
        <span className='text-6xl md:text-6xl md:text-8xl'>magni</span>{' '}
        veritatis ipsa libero perspiciatis, fugiat{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI02} />
        </span>
        doloribus assumenda, culpa, odit temporibus dolore.
        <span className='text-6xl md:text-8xl'>Cumque</span>, laboriosam
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI03} />
        </span>
        eum aut corporis reprehenderit{' '}
        <span className='text-6xl md:text-8xl'>tempora</span>
        itaque pariatur voluptas veritatis dolores dolor{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI04} />
        </span>
        quidem nostrum fugit soluta saepe magni{' '}
        <span className='text-6xl md:text-8xl'>expedita</span> voluptatum{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI05} />
        </span>
        ratione qui obcaecati. In quisquam, laborum{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI06} />
        </span>
        tenetur, quas totam et quos nihil possimus rem quibusdam tempore dolores
        voluptatum officiis{' '}
        <span className='text-6xl md:text-8xl'>eligendi</span> quasi sed{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI07} />
        </span>
        voluptas illo harum minus veniam optio enim expedita magnam eos.
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI08} />
        </span>
        Praesentium, architecto quos! Magni provident in dignissimos{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI09} />
        </span>{' '}
        culpa sint vel distinctio, natus iste{' '}
        <span className='text-6xl md:text-8xl'>reprehenderit</span> molestias
        eligendi nisi mollitia est praesentium dolor! Ipsa vel{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI10} />
        </span>
        totam tempore alias odio, voluptatem animi dicta, facere velit, eveniet
        deleniti id perspiciatis repellendus{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI11} />
        </span>{' '}
        mollitia quibusdam illo cumque. In{' '}
        <span className='text-6xl md:text-8xl'>itaque</span> maxime qui velit,
        ut corrupti est debitis{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI12} />
        </span>
        nobis hic <span className='text-6xl md:text-8xl'>fuga</span> impedit
        aspernatur recusandae minus libero animi sint aperiam. Ad minima{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI13} />
        </span>{' '}
        corrupti suscipit enim minus iure quos{' '}
        <span className='text-6xl md:text-8xl'>commodi</span> alias, numquam eum
        dolores{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI14} />
        </span>{' '}
        possimus <span className='text-6xl md:text-8xl'>excepturi</span> dolore{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI15} />
        </span>{' '}
        culpa nisi fugiat vel.{' '}
        <span className='text-6xl md:text-8xl'>Obcaecati</span> dolorum non,
        doloribus dolor sint{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI16} />
        </span>{' '}
        sapiente explicabo{' '}
        <span className='text-6xl md:text-8xl'>accusantium</span> iure quos ea
        amet consequuntur impedit officia?{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI17} />
        </span>{' '}
        Ipsum voluptates itaque, error nostrum eum, odio
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI18} />
        </span>{' '}
        voluptatem cumque dicta autem{' '}
        <span className='text-6xl md:text-8xl'>animi</span> dignissimos nulla
        nemo{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI19} />
        </span>{' '}
        facilis nesciunt atque!{' '}
        <span className='text-6xl md:text-8xl'>Ratione</span> ipsa id sint
        fugit, sit porro laboriosam{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI18} />
        </span>{' '}
        voluptatem cumque dicta autem{' '}
        <span className='text-6xl md:text-8xl'>animi</span> dignissimos nulla
        nemo{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI20} />
        </span>{' '}
        error mollitia quis{' '}
        <span className='text-6xl md:text-8xl'>voluptatum</span> impedit enim
        officiis velit aliquam omnis, saepe laudantium{' '}
        <span className='text-6xl md:text-8xl'>debitis</span> in quo obcaecati
        optio eum quaerat aliquid alias!{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI21} />
        </span>{' '}
        Asperiores ipsam dolor tempora impedit, dolores molestias{' '}
        <span className='text-6xl md:text-8xl'>magni</span> delectus officia
        illum? Pariatur aliquam, iusto, nobis{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI22} />
        </span>{' '}
        vero, cum impedit{' '}
        <span className='text-6xl md:text-8xl'>blanditiis</span> exercitationem
        quo{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI23} />
        </span>{' '}
        consequuntur ab minima illum. Ab{' '}
        <span className='text-6xl md:text-8xl'>nemo</span> asperiores, alias
        aperiam nobis placeat quia fugit{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI24} />
        </span>{' '}
        ratione repellat nisi amet sed{' '}
        <span className='text-6xl md:text-8xl'>culpa</span> expedita velit
        tempore in delectus{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI25} />
        </span>{' '}
        incidunt consectetur suscipit totam qui!{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI26} />
        </span>{' '}
        <span className='text-6xl md:text-8xl'>Sint</span> adipisci laborum
        aperiam aliquam similique ut reiciendis ratione corrupti aliquid.{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI27} />
        </span>{' '}
        Est culpa dolore <span className='text-6xl md:text-8xl'>eligendi</span>{' '}
        incidunt illo fugit nihil veniam, porro rerum iste veritatis.{' '}
        <span className='text-6xl md:text-8xl'>Magnam</span> impedit tempora
        eveniet amet rem vel eos, repellendus dolore.{' '}
        <span className='text-6xl md:text-8xl'>Voluptatibus</span>{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI28} />
        </span>{' '}
        iste soluta id{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI29} />
        </span>{' '}
        ipsam <span className='text-6xl md:text-8xl'>saepe</span> ab voluptates
        culpa officiis quaerat, omnis{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI30} />
        </span>{' '}
        veritatis quasi optio nisi odio consequatur provident, recusandae
        suscipit eveniet minima ullam.{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI31} />
        </span>{' '}
        Repellat nihil <span className='text-6xl md:text-8xl'>voluptatum</span>{' '}
        totam assumenda. Perferendis quaerat,{' '}
        <span className='text-6xl md:text-8xl'>repellendus</span> ex quod
        consequuntur totam perspiciatis consequatur{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI32} />
        </span>{' '}
        soluta explicabo,{' '}
        <span className='text-6xl md:text-8xl'>architecto</span> id placeat
        neque{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI33} />
        </span>{' '}
        deserunt beatae debitis suscipit quidem vel.{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI34} />
        </span>{' '}
        Perferendis, ab libero facilis{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI35} />
        </span>{' '}
        voluptas <span className='text-6xl md:text-8xl'>soluta</span> eaque
        necessitatibus dicta, laborum illo{' '}
        <span className='text-6xl md:text-8xl'>doloremque</span> iusto eos dolor
        ex aut corporis.{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI36} />
        </span>{' '}
        Corrupti quisquam, quam vel mollitia quod reprehenderit consectetur modi
        impedit!{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI37} />
        </span>{' '}
        Laudantium <span className='text-6xl md:text-8xl'>possimus</span> magnam
        similique omnis fuga eligendi,{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI38} />
        </span>{' '}
        doloribus illo tempore iste minus officiis{' '}
        <span className='text-6xl md:text-8xl'>nobis</span> facere quia dicta,
        accusantium provident nemo impedit unde fugiat ex?{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI39} />
        </span>{' '}
        Earum culpa <span className='text-6xl md:text-8xl'>molestiae</span>{' '}
        laboriosam, aut deserunt quasi distinctio beatae eum cupiditate{' '}
        <span
          style={{
            display: 'inline-block',
            verticalAlign: 'end',
            margin: '0 10px',
            border: '4px #370008 solid',
          }}
        >
          <Image alt='' height={300} width={300} src={moodboardImages.MI40} />
        </span>{' '}
        quo mollitia <span className='text-6xl md:text-8xl'>porro</span>{' '}
        molestias voluptatum unde neque sunt dicta temporibus incidunt debitis
        animi tenetur id pariatur.
      </div>
    </main>
  );
}

// export default function Journal() {}

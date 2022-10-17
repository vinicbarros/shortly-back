--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "isValid" boolean DEFAULT true NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    "urlId" integer NOT NULL
);


--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY2NTc1NDYzOCwiZXhwIjoxNjY1NzYxODM4fQ.GwTFG292jFIICONz340rqnjywSD1YxCZkfPxNyCqfrY', true);
INSERT INTO public.sessions VALUES (6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY2NTc1NDc0NSwiZXhwIjoxNjY1NzU0ODA1fQ.a0bMutfbbNkeKioW9dHZbjePwyfAURhGAdunvjZn0JQ', false);
INSERT INTO public.sessions VALUES (7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY2NTc1NTU0NywiZXhwIjoxNjY1NzYyNzQ3fQ.tYCZz0FiLT4mLa-C6FdZXH8UZ6KsPICShG6prDPDliI', true);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (35, 4, '8ahe1zztbEnqFmJ3ZbIZe', 'https://www.twitter.com/', '2022-10-12 20:14:45.912299');
INSERT INTO public.urls VALUES (36, 4, 'Rj5_pS9KZ6d4yjay92Vt6', 'https://www.twitter.com/', '2022-10-12 20:15:35.773812');
INSERT INTO public.urls VALUES (37, 4, 'qY52fDfuwCNwQjcQ-zyjC', 'https://styled-components.com/', '2022-10-13 09:07:32.507848');
INSERT INTO public.urls VALUES (39, 5, '9wmq-p3E_IcjwrNH66vLT', 'https://getcssscan.com/css-box-shadow-examples', '2022-10-13 10:04:06.921592');
INSERT INTO public.urls VALUES (40, 6, 'xH6biAepr2yalvllGv2yF', 'https://www.facebook.com/', '2022-10-13 13:55:10.084377');
INSERT INTO public.urls VALUES (42, 6, '-hSC3R_BDSV0sB9O8oK7b', 'https://www.w3resource.com/sql/aggregate-functions/count-with-distinct.php', '2022-10-13 17:55:50.71154');
INSERT INTO public.urls VALUES (43, 7, 'U59I8OD4VVwGn6wRGps27', 'https://www.w3resource.com/sql/aggregate-functions/count-with-distinct.php', '2022-10-13 18:07:24.209924');
INSERT INTO public.urls VALUES (44, 7, 'LK_MbhLHqdAMA5lveCRHp', 'https://insomnia.rest/download', '2022-10-13 18:07:38.4451');
INSERT INTO public.urls VALUES (45, 7, 'Tmn_qEbPq_oNOO3AGqMZx', 'https://www.beekeeperstudio.io/', '2022-10-13 18:08:24.305318');
INSERT INTO public.urls VALUES (46, 7, 'jtUIpFETXTrSQSUVMgknE', 'https://www.instagram.com', '2022-10-13 18:08:33.470873');
INSERT INTO public.urls VALUES (47, 7, 'UBRVZbsOeuE08iXd_iWbX', 'https://www.codewars.com/', '2022-10-13 18:08:50.614408');
INSERT INTO public.urls VALUES (48, 7, 'Qw-0dZlIjG5FHtH-Twz-e', 'https://getcssscan.com/css-box-shadow-examples', '2022-10-13 18:08:59.644546');
INSERT INTO public.urls VALUES (50, 8, 'Zla5FfgOXWtwTYr091FoX', 'https://www.globo.com/', '2022-10-14 10:53:08.792646');
INSERT INTO public.urls VALUES (51, 8, 's-8Amq0wA4I2HKUPaEsXC', 'https://globoplay.globo.com/?origemId=1760&utm_source=gcom&utm_medium=home&utm_campaign=gcom-botao-destaque-superior', '2022-10-14 10:53:32.436851');
INSERT INTO public.urls VALUES (52, 8, 'ZiZxJtJJXGy3iSAnLu9aV', 'https://pt.wikipedia.org/wiki/Luciano_Huck', '2022-10-14 10:53:57.564771');
INSERT INTO public.urls VALUES (53, 8, '_atVYjLX2w1O_h7TVaMOe', 'https://vivaocredito.com.br/qual-e-a-fortuna-de-luciano-huck/', '2022-10-14 10:54:26.159721');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Pedro', 'pedroca@gmail.com', '$2b$12$IccNmimcZ5D60rQsWeE09.SFKMu57V4WXYbbmkn8NE341izm0Q./i', '2022-10-11 10:56:48.21407');
INSERT INTO public.users VALUES (2, 'Valdecir', 'valders@hotmail.com', '$2b$12$nFasRYVkxV7wVKdQRuT3ieKzgnavpVeqct4a.jvJvY5da4sGVADVK', '2022-10-11 10:58:44.928403');
INSERT INTO public.users VALUES (3, 'José Vitor', 'vitinho@gmail.com', '$2b$12$swdCwW41nZWKVwtiqC1eIeFn5dFnAoDqHbWI7Acft/1k8NCd6b0pi', '2022-10-11 13:59:57.197786');
INSERT INTO public.users VALUES (4, 'Claudinei Santos', 'claudinhoney@hotmail.com', '$2b$12$sm6HAUwTkBoHIWE7N5ABDOKtmZYYTXcJdzVOpC/oHeYDzXc/2HZ9q', '2022-10-12 11:58:23.068592');
INSERT INTO public.users VALUES (5, 'João Gomes', 'gomesy@gmail.com', '$2b$12$qSTvJK5jHaKlFVCxdU2C/.iHr7xxuJS9JlR29QXj9M8i1vU/3qQFW', '2022-10-13 10:01:40.661678');
INSERT INTO public.users VALUES (6, 'Marcela Bernardes', 'marcelao_nardes@outlook.com', '$2b$12$pnS8b92LM9Blr3oTPiuZeuKpKrHVgOnfZLBfppV6dajFtwMv7PmrS', '2022-10-13 13:53:20.31753');
INSERT INTO public.users VALUES (7, 'Jade Picon', 'sou_rica@hotmail.com', '$2b$12$SvVy4PMp7HrYPmrdYtBnLOpdsbo.jf6FylzDjUN6Nidnize9IIOvC', '2022-10-13 18:06:36.276343');
INSERT INTO public.users VALUES (8, 'Luciano Hulk', 'caldeirao@globo.com', '$2b$12$A5JcsCyHZZS8uSRiINUPw.Q2.qF.CgKrtc0Lyd7QW05x4zMVAWYhK', '2022-10-14 10:51:29.250551');


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.visits VALUES (1, 42);
INSERT INTO public.visits VALUES (2, 42);
INSERT INTO public.visits VALUES (3, 42);
INSERT INTO public.visits VALUES (4, 42);
INSERT INTO public.visits VALUES (5, 42);
INSERT INTO public.visits VALUES (6, 42);
INSERT INTO public.visits VALUES (7, 42);
INSERT INTO public.visits VALUES (8, 40);
INSERT INTO public.visits VALUES (9, 40);
INSERT INTO public.visits VALUES (10, 40);
INSERT INTO public.visits VALUES (11, 40);
INSERT INTO public.visits VALUES (12, 40);
INSERT INTO public.visits VALUES (13, 40);
INSERT INTO public.visits VALUES (14, 40);
INSERT INTO public.visits VALUES (15, 40);
INSERT INTO public.visits VALUES (16, 40);
INSERT INTO public.visits VALUES (17, 40);
INSERT INTO public.visits VALUES (18, 40);
INSERT INTO public.visits VALUES (19, 40);
INSERT INTO public.visits VALUES (20, 46);
INSERT INTO public.visits VALUES (21, 46);
INSERT INTO public.visits VALUES (22, 48);
INSERT INTO public.visits VALUES (23, 48);
INSERT INTO public.visits VALUES (24, 48);
INSERT INTO public.visits VALUES (25, 45);
INSERT INTO public.visits VALUES (26, 45);
INSERT INTO public.visits VALUES (27, 45);
INSERT INTO public.visits VALUES (28, 45);
INSERT INTO public.visits VALUES (29, 45);
INSERT INTO public.visits VALUES (30, 45);
INSERT INTO public.visits VALUES (31, 45);
INSERT INTO public.visits VALUES (32, 39);
INSERT INTO public.visits VALUES (33, 39);
INSERT INTO public.visits VALUES (34, 39);
INSERT INTO public.visits VALUES (35, 39);
INSERT INTO public.visits VALUES (36, 39);
INSERT INTO public.visits VALUES (37, 39);
INSERT INTO public.visits VALUES (38, 39);
INSERT INTO public.visits VALUES (39, 39);
INSERT INTO public.visits VALUES (40, 36);
INSERT INTO public.visits VALUES (41, 36);
INSERT INTO public.visits VALUES (42, 36);
INSERT INTO public.visits VALUES (43, 36);
INSERT INTO public.visits VALUES (44, 36);
INSERT INTO public.visits VALUES (45, 36);
INSERT INTO public.visits VALUES (46, 36);
INSERT INTO public.visits VALUES (47, 36);
INSERT INTO public.visits VALUES (48, 36);
INSERT INTO public.visits VALUES (49, 36);
INSERT INTO public.visits VALUES (50, 36);
INSERT INTO public.visits VALUES (51, 36);
INSERT INTO public.visits VALUES (52, 36);
INSERT INTO public.visits VALUES (53, 36);
INSERT INTO public.visits VALUES (54, 36);
INSERT INTO public.visits VALUES (55, 36);
INSERT INTO public.visits VALUES (56, 36);
INSERT INTO public.visits VALUES (57, 36);
INSERT INTO public.visits VALUES (58, 36);
INSERT INTO public.visits VALUES (59, 36);
INSERT INTO public.visits VALUES (60, 36);
INSERT INTO public.visits VALUES (61, 36);
INSERT INTO public.visits VALUES (62, 36);
INSERT INTO public.visits VALUES (63, 36);
INSERT INTO public.visits VALUES (64, 36);
INSERT INTO public.visits VALUES (65, 36);
INSERT INTO public.visits VALUES (66, 53);
INSERT INTO public.visits VALUES (67, 53);
INSERT INTO public.visits VALUES (68, 50);
INSERT INTO public.visits VALUES (69, 51);
INSERT INTO public.visits VALUES (70, 51);
INSERT INTO public.visits VALUES (71, 51);
INSERT INTO public.visits VALUES (72, 52);
INSERT INTO public.visits VALUES (73, 52);
INSERT INTO public.visits VALUES (74, 52);
INSERT INTO public.visits VALUES (75, 52);
INSERT INTO public.visits VALUES (76, 51);
INSERT INTO public.visits VALUES (77, 51);
INSERT INTO public.visits VALUES (78, 51);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 7, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 53, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.visits_id_seq', 78, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: visits visits_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES public.urls(id);


--
-- PostgreSQL database dump complete
--


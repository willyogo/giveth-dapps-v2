/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IDistroInterface extends utils.Interface {
  functions: {
    "allocate(address,uint256,bool)": FunctionFragment;
    "allocateMany(address[],uint256[])": FunctionFragment;
    "assign(address,uint256)": FunctionFragment;
    "cancelAllocation(address,address)": FunctionFragment;
    "changeAddress(address)": FunctionFragment;
    "claim()": FunctionFragment;
    "claimableAt(address,uint256)": FunctionFragment;
    "claimableNow(address)": FunctionFragment;
    "getTimestamp()": FunctionFragment;
    "globallyClaimableAt(uint256)": FunctionFragment;
    "sendGIVbacks(address[],uint256[])": FunctionFragment;
    "setStartTime(uint256)": FunctionFragment;
    "totalTokens()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allocate",
    values: [string, BigNumberish, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "allocateMany",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "assign",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelAllocation",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "changeAddress",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "claim", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claimableAt",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "claimableNow",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "globallyClaimableAt",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "sendGIVbacks",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setStartTime",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalTokens",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "allocate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allocateMany",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "assign", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cancelAllocation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimableAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimableNow",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "globallyClaimableAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendGIVbacks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStartTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalTokens",
    data: BytesLike
  ): Result;

  events: {
    "Allocate(address,address,uint256)": EventFragment;
    "Assign(address,address,uint256)": EventFragment;
    "ChangeAddress(address,address)": EventFragment;
    "Claim(address,uint256)": EventFragment;
    "StartTimeChanged(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Allocate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Assign"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChangeAddress"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Claim"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StartTimeChanged"): EventFragment;
}

export type AllocateEvent = TypedEvent<
  [string, string, BigNumber],
  { distributor: string; grantee: string; amount: BigNumber }
>;

export type AllocateEventFilter = TypedEventFilter<AllocateEvent>;

export type AssignEvent = TypedEvent<
  [string, string, BigNumber],
  { admin: string; distributor: string; amount: BigNumber }
>;

export type AssignEventFilter = TypedEventFilter<AssignEvent>;

export type ChangeAddressEvent = TypedEvent<
  [string, string],
  { oldAddress: string; newAddress: string }
>;

export type ChangeAddressEventFilter = TypedEventFilter<ChangeAddressEvent>;

export type ClaimEvent = TypedEvent<
  [string, BigNumber],
  { grantee: string; amount: BigNumber }
>;

export type ClaimEventFilter = TypedEventFilter<ClaimEvent>;

export type StartTimeChangedEvent = TypedEvent<
  [BigNumber, BigNumber],
  { newStartTime: BigNumber; newCliffTime: BigNumber }
>;

export type StartTimeChangedEventFilter =
  TypedEventFilter<StartTimeChangedEvent>;

export interface IDistro extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDistroInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    allocate(
      recipient: string,
      amount: BigNumberish,
      claim: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    allocateMany(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    assign(
      distributor: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    cancelAllocation(
      prevRecipient: string,
      newRecipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeAddress(
      newAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimableAt(
      recipient: string,
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    claimableNow(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    globallyClaimableAt(
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    sendGIVbacks(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setStartTime(
      newStartTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalTokens(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  allocate(
    recipient: string,
    amount: BigNumberish,
    claim: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  allocateMany(
    recipients: string[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  assign(
    distributor: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  cancelAllocation(
    prevRecipient: string,
    newRecipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeAddress(
    newAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claim(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimableAt(
    recipient: string,
    timestamp: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  claimableNow(
    recipient: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  globallyClaimableAt(
    timestamp: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  sendGIVbacks(
    recipients: string[],
    amounts: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setStartTime(
    newStartTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalTokens(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    allocate(
      recipient: string,
      amount: BigNumberish,
      claim: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    allocateMany(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    assign(
      distributor: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelAllocation(
      prevRecipient: string,
      newRecipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    changeAddress(newAddress: string, overrides?: CallOverrides): Promise<void>;

    claim(overrides?: CallOverrides): Promise<void>;

    claimableAt(
      recipient: string,
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimableNow(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    globallyClaimableAt(
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendGIVbacks(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    setStartTime(
      newStartTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    totalTokens(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Allocate(address,address,uint256)"(
      distributor?: string | null,
      grantee?: string | null,
      amount?: null
    ): AllocateEventFilter;
    Allocate(
      distributor?: string | null,
      grantee?: string | null,
      amount?: null
    ): AllocateEventFilter;

    "Assign(address,address,uint256)"(
      admin?: string | null,
      distributor?: string | null,
      amount?: null
    ): AssignEventFilter;
    Assign(
      admin?: string | null,
      distributor?: string | null,
      amount?: null
    ): AssignEventFilter;

    "ChangeAddress(address,address)"(
      oldAddress?: string | null,
      newAddress?: string | null
    ): ChangeAddressEventFilter;
    ChangeAddress(
      oldAddress?: string | null,
      newAddress?: string | null
    ): ChangeAddressEventFilter;

    "Claim(address,uint256)"(
      grantee?: string | null,
      amount?: null
    ): ClaimEventFilter;
    Claim(grantee?: string | null, amount?: null): ClaimEventFilter;

    "StartTimeChanged(uint256,uint256)"(
      newStartTime?: null,
      newCliffTime?: null
    ): StartTimeChangedEventFilter;
    StartTimeChanged(
      newStartTime?: null,
      newCliffTime?: null
    ): StartTimeChangedEventFilter;
  };

  estimateGas: {
    allocate(
      recipient: string,
      amount: BigNumberish,
      claim: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    allocateMany(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    assign(
      distributor: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    cancelAllocation(
      prevRecipient: string,
      newRecipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeAddress(
      newAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimableAt(
      recipient: string,
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimableNow(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    globallyClaimableAt(
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendGIVbacks(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setStartTime(
      newStartTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalTokens(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    allocate(
      recipient: string,
      amount: BigNumberish,
      claim: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    allocateMany(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    assign(
      distributor: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    cancelAllocation(
      prevRecipient: string,
      newRecipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeAddress(
      newAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claim(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimableAt(
      recipient: string,
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimableNow(
      recipient: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    globallyClaimableAt(
      timestamp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sendGIVbacks(
      recipients: string[],
      amounts: BigNumberish[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setStartTime(
      newStartTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}